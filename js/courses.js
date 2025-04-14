document.addEventListener('DOMContentLoaded', function() {
    // Sample course data
    const courses = [
        {
            id: "web-development-101",
            title: "Web Development Fundamentals",
            description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.",
            instructor: "John Smith",
            price: 49.99,
            originalPrice: 99.99,
            image: "https://placehold.co/400x300",
            category: "Web Development",
            rating: 4.8,
            duration: "8 weeks",
            lessons: 24,
            featured: true
        },
        {
            id: "data-science-fundamentals",
            title: "Data Science Essentials",
            description: "Master the fundamentals of data analysis, visualization, and machine learning.",
            instructor: "Emily Chen",
            price: 59.99,
            originalPrice: 129.99,
            image: "https://placehold.co/400x300",
            category: "Data Science",
            rating: 4.7,
            duration: "10 weeks",
            lessons: 32
        },
        {
            id: "ux-design-principles",
            title: "UX Design Principles",
            description: "Learn the core principles of user experience design and create intuitive interfaces.",
            instructor: "Michael Johnson",
            price: 44.99,
            originalPrice: 89.99,
            image: "https://placehold.co/400x300",
            category: "Design",
            rating: 4.9,
            duration: "6 weeks",
            lessons: 18,
            featured: true
        },
        {
            id: "python-programming",
            title: "Python Programming Masterclass",
            description: "Comprehensive guide to Python programming from basics to advanced concepts.",
            instructor: "David Wilson",
            price: 54.99,
            originalPrice: 109.99,
            image: "https://placehold.co/400x300",
            category: "Programming",
            rating: 4.8,
            duration: "12 weeks",
            lessons: 36
        },
        {
            id: "digital-marketing",
            title: "Digital Marketing Strategy",
            description: "Learn effective digital marketing strategies to grow your business online.",
            instructor: "Sarah Thompson",
            price: 49.99,
            image: "https://placehold.co/400x300",
            category: "Marketing",
            rating: 4.6,
            duration: "8 weeks",
            lessons: 24
        },
        {
            id: "mobile-app-development",
            title: "Mobile App Development with React Native",
            description: "Build cross-platform mobile apps using React Native framework.",
            instructor: "Alex Rodriguez",
            price: 59.99,
            originalPrice: 119.99,
            image: "https://placehold.co/400x300",
            category: "Mobile Development",
            rating: 4.7,
            duration: "10 weeks",
            lessons: 30
        }
    ];
    
    // Function to create course card
    function createCourseCard(course) {
        return `
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    ${course.featured ? '<span class="course-badge">Featured</span>' : ''}
                </div>
                <div class="course-content">
                    <div class="course-meta">
                        <span class="course-category">${course.category}</span>
                        <div class="course-rating">
                            <i class="fas fa-star"></i>
                            <span>${course.rating}</span>
                        </div>
                    </div>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-instructor">By ${course.instructor}</p>
                    <p class="course-description">${course.description}</p>
                    <div class="course-details">
                        <div class="course-detail">
                            <i class="far fa-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                        <div class="course-detail">
                            <i class="fas fa-book-open"></i>
                            <span>${course.lessons} lessons</span>
                        </div>
                    </div>
                    <div class="course-footer">
                        <div class="course-price-container">
                            <span class="course-price">$${course.price}</span>
                            ${course.originalPrice ? `<span class="course-original-price">$${course.originalPrice}</span>` : ''}
                        </div>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-primary">Enroll Now</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render courses
    const coursesContainer = document.getElementById('courses-container');
    if (coursesContainer) {
        let coursesHTML = '';
        courses.forEach(course => {
            coursesHTML += createCourseCard(course);
        });
        coursesContainer.innerHTML = coursesHTML;
    }
    
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.querySelector('.search-input');
    
    function filterCourses() {
        if (!coursesContainer) return;
        
        const categoryValue = categoryFilter ? categoryFilter.value.toLowerCase() : '';
        const levelValue = levelFilter ? levelFilter.value.toLowerCase() : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        let filteredCourses = [...courses];
        
        // Filter by category
        if (categoryValue) {
            filteredCourses = filteredCourses.filter(course => 
                course.category.toLowerCase().includes(categoryValue)
            );
        }
        
        // Filter by level (assuming we had level data)
        if (levelValue) {
            filteredCourses = filteredCourses.filter(course => 
                course.level && course.level.toLowerCase() === levelValue
            );
        }
        
        // Filter by search
        if (searchValue) {
            filteredCourses = filteredCourses.filter(course => 
                course.title.toLowerCase().includes(searchValue) || 
                course.description.toLowerCase().includes(searchValue) ||
                course.category.toLowerCase().includes(searchValue)
            );
        }
        
        // Sort courses
        if (sortFilter && sortFilter.value) {
            switch(sortFilter.value) {
                case 'popular':
                    filteredCourses.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    // In a real app, we would sort by date
                    break;
                case 'price-low':
                    filteredCourses.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredCourses.sort((a, b) => b.price - a.price);
                    break;
            }
        }
        
        // Render filtered courses
        let coursesHTML = '';
        if (filteredCourses.length > 0) {
            filteredCourses.forEach(course => {
                coursesHTML += createCourseCard(course);
            });
        } else {
            coursesHTML = '<div class="no-courses">No courses found matching your criteria.</div>';
        }
        
        coursesContainer.innerHTML = coursesHTML;
    }
    
    // Add event listeners to filters
    if (categoryFilter) categoryFilter.addEventListener('change', filterCourses);
    if (levelFilter) levelFilter.addEventListener('change', filterCourses);
    if (sortFilter) sortFilter.addEventListener('change', filterCourses);
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Debounce search to avoid too many renders
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(filterCourses, 300);
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) return;
                
                // Remove active class from all buttons
                document.querySelectorAll('.pagination-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real app, we would fetch and display the corresponding page of courses
            });
        });
    }
});