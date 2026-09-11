// Dev fallback: when the compiled _ds_bundle.js is absent, transpile the sibling .jsx files in-page.
// Usage: await window.__loadDS(["./Button.jsx", ...]) → object of exports.
window.__loadDS = async function (paths) {
  const reg = {};
  const done = new Set();
  const load = async (path) => {
    const url = new URL(path, document.baseURI).href;
    if (done.has(url)) return; done.add(url);
    let src = await (await fetch(url)).text();
    const deps = [...src.matchAll(/import\s*\{([^}]+)\}\s*from\s*"(\.[^"]+)"/g)];
    for (const d of deps) await load(new URL(d[2], url).href);
    src = src.replace(/import\s+React\s+from\s+"react";?/g, "")
      .replace(/import\s*\{([^}]+)\}\s*from\s*"(\.[^"]+)";?/g, (m, names) => `const {${names}} = __reg;`)
      .replace(/export\s+function\s+(\w+)/g, (m, n) => `__reg.${n} = ${n}; function ${n}`)
      .replace(/export\s+(const|let|var)\s+(\w+)/g, (m, k, n) => `${k} ${n} = __reg.${n}`);
    // `const X = __reg.X = value` — rewrite to assign after declaration
    src = src.replace(/(const|let|var) (\w+) = __reg\.\2\s*=/g, (m, k, n) => `${k} ${n} = __reg.${n} =`);
    const js = Babel.transform(src, { presets: [["react", { runtime: "classic" }]] }).code;
    new Function("React", "__reg", js)(window.React, reg);
  };
  for (const p of paths) await load(p);
  return reg;
};

// Fetch a .jsx file, transpile with Babel, run it (inline JSX scripts are not executable in this host).
window.__runJSX = async function (path) {
  let src = await (await fetch(new URL(path, document.baseURI).href)).text();
  src = src.replace(/^\s*import\s[^\n]*$/gm, "").replace(/^\s*export\s+(default\s+)?/gm, "");
  const code = Babel.transform(src, { presets: [["react", { runtime: "classic" }]] }).code;
  new Function(code)();
};
