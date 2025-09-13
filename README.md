# UFS EMS Navigator

## Project Overview

The UFS EMS Navigator is a comprehensive web portal designed for the University of the Free State's Economic and Management Sciences (EMS) Faculty. This responsive, user-friendly interface serves as a central hub for students, faculty, and staff to access academic resources, course information, and faculty directories.

## Design & User Interface

### Color Scheme
- **Primary Color**: UFS Blue (#003D77) - Used for headers, primary buttons, and important call-to-action elements
- **Secondary Color**: UFS Yellow (#FFD100) - Used for highlights, accents, and secondary buttons
- **Background**: Light gray (#F8F9FA) for content areas, white (#FFFFFF) for cards and containers
- **Text**: Dark gray (#212529) for body text, slightly lighter gray (#6C757D) for secondary text

### Typography
- **Primary Font**: 'Roboto', sans-serif - Clean and highly readable for body text
- **Secondary Font**: 'Montserrat', sans-serif - Used for headings and navigation
- **Base Font Size**: 16px with responsive scaling
- **Line Height**: 1.6 for optimal readability

### Layout
1. **Header**
   - Fixed position for easy navigation
   - UFS logo on the left
   - Main navigation menu with dropdowns
   - Mobile-responsive hamburger menu

2. **Hero Section**
   - Full-width banner with gradient overlay
   - Clear value proposition
   - Prominent call-to-action buttons

3. **Features Section**
   - Grid layout of feature cards
   - Icons for visual appeal
   - Hover effects for interactivity

4. **Footer**
   - Quick links to important pages
   - Contact information
   - Social media links
   - Copyright information

## Core Features

### 1. Course Prospectus
- Searchable database of all EMS courses
- Filter by department, level, and semester
- Detailed course descriptions and prerequisites

### 2. Faculty Directory
- Searchable directory of faculty members
- Filter by department or research area
- Contact information and office hours

### 3. Student Dashboard
- Personalized course schedule
- Upcoming deadlines and events
- Quick access to learning materials

### 4. Appointment Scheduling
- Calendar integration for faculty meetings
- Automated email confirmations
- Reminder notifications

## Technical Implementation

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UFS EMS Navigator</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
    <header class="main-header">
        <!-- Navigation content -->
    </header>
    
    <main>
        <section class="hero">
            <!-- Hero content -->
        </section>
        
        <section class="features">
            <!-- Features grid -->
        </section>
        
        <!-- Additional sections -->
    </main>
    
    <footer class="main-footer">
        <!-- Footer content -->
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
```

### CSS Architecture
```css
/* Base Styles */
:root {
    --primary-color: #003D77;
    --secondary-color: #FFD100;
    --text-dark: #212529;
    --text-light: #6C757D;
    --background-light: #F8F9FA;
}

/* Typography */
body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background-color: var(--background-light);
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    margin-bottom: 1rem;
}

/* Layout Components */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: #002D59;
    transform: translateY(-2px);
}
```

### JavaScript Functionality
```javascript
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    
    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('open');
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Form Validation
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    let isValid = true;
    
    if (!email.value.includes('@')) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
    }
    
    return isValid;
}
```

## Responsive Design
- Mobile-first approach using CSS Grid and Flexbox
- Media queries for different screen sizes
- Responsive typography using viewport units
- Touch-friendly navigation elements

## Performance Optimization
- Minified CSS and JavaScript files
- Optimized images with WebP format
- Lazy loading for below-the-fold content
- Caching strategy for static assets

## Accessibility
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome for Android

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ufs-ems-navigator.git
   cd ufs-ems-navigator
   ```

2. Open `index.html` in your preferred web browser

3. For development, use a local server:
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

## Deployment

Simply upload all files to your web server. The application is completely static and doesn't require server-side processing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- University of the Free State for the brand assets
- Google Fonts for the typography
- All contributors who helped build this platform
