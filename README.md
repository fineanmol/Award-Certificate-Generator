# 🏆 Award Certificate Generator · Vue 3

A beautiful, modern certificate generator built with Vue 3, TypeScript, and Tailwind CSS. Generate professional award certificates with customizable templates, themes, and export options.

![Certificate Generator Preview](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🎯 **Pre-built Templates**
- **🐞 Bug Slayer** - Certificate of Debugging Excellence
- **🔍 Code Reviewer** - Certificate of Review Excellence  
- **🤝 Team Player** - Certificate of Team Excellence
- **✨ Innovation Award** - Certificate of Innovation
- **🚨 On-Call Hero** - Certificate of Reliability
- **📚 Docs Champion** - Certificate of Clarity
- **🎨 Custom Template** - Fully customizable content

### 🎨 **Customization Options**
- **Layout**: A4 or Letter size
- **Orientation**: Landscape or Portrait
- **Themes**: Classic, Minimal, or Regal styling
- **Colors**: Custom accent colors
- **Typography**: Professional font stacks
- **Borders**: Show/hide decorative borders
- **Seals**: Optional award seals
- **QR Codes**: Include verification QR codes

### 📝 **Editable Fields**
- Certificate title and subtitle
- Recipient name
- Achievement reason/citation
- Issuer organization
- Issue date
- Signature names and labels
- Footer notes
- Logo URLs
- Certificate IDs

### 📤 **Export Options**
- **PNG Export**: High-quality image files (2x scale)
- **PDF Export**: Print-ready PDF documents
- **Print**: Direct browser printing
- **Perfect Layout**: No distortion in exports

### 🚀 **Modern Architecture**
- Vue 3 Composition API
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development
- Responsive design
- Real-time preview

## 🛠 Tech Stack

- **Frontend**: Vue 3 + TypeScript + Composition API
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Export Libraries**: html2canvas + jsPDF
- **QR Codes**: qrcode.vue
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint + Prettier

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd Award-Certiciate-Generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Usage

### 1. **Select a Template**
Choose from pre-built templates or select "Custom" for full control.

### 2. **Customize Content**
- Fill in recipient details
- Edit certificate text
- Choose colors and styling
- Add logos and signatures

### 3. **Configure Layout**
- Select paper size (A4/Letter)
- Choose orientation (Landscape/Portrait) 
- Pick a theme (Classic/Minimal/Regal)
- Enable/disable borders and seals

### 4. **Export Certificate**
- **PNG**: Click "Download PNG" for image export
- **PDF**: Click "Download PDF" for print-ready file
- **Print**: Click "Print" for direct printing

## 🎨 Templates Guide

### Pre-built Templates
Each template comes with predefined content optimized for specific achievements:

- **Bug Slayer**: For developers who excel at debugging
- **Code Reviewer**: For thorough code review excellence  
- **Team Player**: For outstanding collaboration
- **Innovation Award**: For creative problem-solving
- **On-Call Hero**: For reliability and incident response
- **Docs Champion**: For excellent documentation

### Custom Templates
When "Custom" is selected:
- All fields become fully editable
- Visual indicators highlight customizable areas
- Template name is editable
- No preset content restrictions

## 🎛 Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Type checking and build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test:unit

# Lint code
npm run lint

# Type check
npm run type-check
```

### Project Structure

```
src/
├── components/
│   └── AwardCertificateGenerator.vue  # Main component
├── main.ts                            # App entry point  
├── style.css                          # Tailwind styles
└── App.vue                            # Root component

public/
└── favicon.ico                        # App icon

config/
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
├── tsconfig.json                      # TypeScript configuration
└── vite.config.ts                     # Vite configuration
```

## 🔧 Configuration

### Tailwind CSS
The app uses Tailwind CSS with custom utilities:
- Dynamic color support
- Print media queries  
- Custom seal styling
- Responsive design classes

### Export Settings
- **PNG**: 2x scale for high quality
- **PDF**: Exact paper dimensions
- **Fonts**: System font fallbacks
- **Colors**: Print-safe color handling

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- html2canvas for DOM-to-canvas conversion
- jsPDF for PDF generation
- All contributors and users of this project

---

**Made with ❤️ and Vue 3** 

*Generate beautiful certificates for your team's achievements!*