Primary action button; use `primary` (pickle green) once per view, `secondary` (lime) for supporting actions, `outline`/`ghost` for tertiary.
```jsx
<Button size="lg" href="/talk">Book 17-minute diagnostic <ArrowRight size={16}/></Button>
<Button variant="outline">See our guarantee</Button>
```
Variants: primary · secondary · outline · ghost · danger · link. Sizes sm 32 / md 40 / lg 48. `iconOnly` makes a square. Radius is 6px (not pills — pills are reserved for Badge/Tag).