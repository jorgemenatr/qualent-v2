Centered modal with warm-tinted scrim. Used for the PDF-gate and sign-in prompts.
```jsx
<Dialog open={open} onClose={()=>setOpen(false)} title="Get the report" description="We'll email the PDF." actions={<><Button variant="ghost">Cancel</Button><Button>Send it</Button></>}>…</Dialog>
```