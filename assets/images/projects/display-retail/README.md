# Display image structure

Display work is separated by brand before project name.

```text
assets/images/projects/display-retail/
├── quantum/
│   └── quantum-display-system/
│       ├── cover-1200x900.webp
│       ├── gallery-01-1440x1080.webp
│       └── gallery-10-1200x1500.webp
└── kioku/
    └── kioku-display-system/
        ├── cover-1200x900.webp
        ├── gallery-01-1440x1080.webp
        └── gallery-10-1200x1500.webp
```

Never place Quantum and Kioku images in the same project folder. Add future projects under the correct brand folder, then add the matching project entry in `data/projects.js` with `brand`, `brandLabel`, and `brandOrder`.
