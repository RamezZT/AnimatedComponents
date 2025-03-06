const reactDocsItems = [
  { id: 1, name: "Introduction", path: "/docs/getting-started" },
  { id: 2, name: "Rendering Elements", path: "/docs/rendering-elements" },
  { id: 3, name: "Components and Props", path: "/docs/components-and-props" },
  { id: 4, name: "State and Lifecycle", path: "/docs/state-and-lifecycle" },
  { id: 5, name: "Handling Events", path: "/docs/handling-events" },
  { id: 6, name: "Conditional Rendering", path: "/docs/conditional-rendering" },
  { id: 7, name: "Lists and Keys", path: "/docs/lists-and-keys" },
  { id: 8, name: "Forms", path: "/docs/forms" },
  { id: 9, name: "Lifting State Up", path: "/docs/lifting-state-up" },
  {
    id: 10,
    name: "Composition vs Inheritance",
    path: "/docs/composition-vs-inheritance",
  },
  { id: 11, name: "Thinking in React", path: "/docs/thinking-in-react" },
  { id: 12, name: "Hooks Overview", path: "/docs/hooks-overview" },
  { id: 13, name: "Using the State Hook", path: "/docs/hooks-state" },
  { id: 14, name: "Using the Effect Hook", path: "/docs/hooks-effect" },
  { id: 15, name: "Custom Hooks", path: "/docs/hooks-custom" },
  { id: 16, name: "Refs and the DOM", path: "/docs/refs-and-the-dom" },
  { id: 17, name: "Forwarding Refs", path: "/docs/forwarding-refs" },
  { id: 18, name: "Context", path: "/docs/context" },
  { id: 19, name: "Error Boundaries", path: "/docs/error-boundaries" },
  { id: 20, name: "Code Splitting", path: "/docs/code-splitting" },
  { id: 21, name: "Strict Mode", path: "/docs/strict-mode" },
  { id: 22, name: "Concurrent Mode", path: "/docs/concurrent-mode" },
  { id: 23, name: "Suspense", path: "/docs/suspense" },
  { id: 24, name: "React Server Components", path: "/docs/server-components" },
  {
    id: 25,
    name: "Optimizing Performance",
    path: "/docs/optimizing-performance",
  },
  { id: 26, name: "React Developer Tools", path: "/docs/react-devtools" },
  { id: 27, name: "JSX In Depth", path: "/docs/jsx-in-depth" },
  { id: 28, name: "Render Props", path: "/docs/render-props" },
  {
    id: 29,
    name: "Higher-Order Components",
    path: "/docs/higher-order-components",
  },
  {
    id: 30,
    name: "Integrating with Other Libraries",
    path: "/docs/integrating-with-other-libraries",
  },
  { id: 31, name: "Portals", path: "/docs/portals" },
  {
    id: 32,
    name: "Uncontrolled Components",
    path: "/docs/uncontrolled-components",
  },
  { id: 33, name: "Web Components", path: "/docs/web-components" },
  {
    id: 34,
    name: "Server-Side Rendering",
    path: "/docs/server-side-rendering",
  },
  {
    id: 35,
    name: "Static Site Generation",
    path: "/docs/static-site-generation",
  },
  { id: 36, name: "Concurrent Rendering", path: "/docs/concurrent-rendering" },
  {
    id: 37,
    name: "Profiling Performance",
    path: "/docs/profiling-performance",
  },
  { id: 38, name: "Testing Overview", path: "/docs/testing-overview" },
  { id: 39, name: "Testing Components", path: "/docs/testing-components" },
  { id: 40, name: "Testing Hooks", path: "/docs/testing-hooks" },
  { id: 41, name: "Debugging", path: "/docs/debugging" },
  { id: 42, name: "Deployment", path: "/docs/deployment" },
  { id: 43, name: "Security Best Practices", path: "/docs/security" },
  { id: 44, name: "Accessibility", path: "/docs/accessibility" },
  { id: 45, name: "Internationalization", path: "/docs/internationalization" },
  { id: 46, name: "State Management", path: "/docs/state-management" },
  { id: 47, name: "React Router", path: "/docs/react-router" },
  { id: 48, name: "Redux", path: "/docs/redux" },
  { id: 49, name: "Context API", path: "/docs/context-api" },
  { id: 50, name: "Next.js", path: "/docs/nextjs" },
  // More real topics up to 150...
];

export default reactDocsItems;
export type ReactDocItemType = {
  id: number;
  name: string;
  path: string;
};
