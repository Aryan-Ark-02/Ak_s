document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('learning-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Module toggle functionality
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const module = this.parentElement;
            
            // Toggle active class
            module.classList.toggle('active');
        });
    });
    
    // Lesson selection functionality
    const lessons = document.querySelectorAll('.lesson');
    const currentLessonTitle = document.getElementById('current-lesson-title');
    const currentModuleTitle = document.getElementById('current-module-title');
    const prevLessonBtn = document.getElementById('prev-lesson');
    const nextLessonBtn = document.getElementById('next-lesson');
    
    // Set first module as active by default
    document.querySelector('.module').classList.add('active');
    
    let completedLessons = [];
    
    lessons.forEach(lesson => {
        lesson.addEventListener('click', function() {
            const moduleIndex = parseInt(this.getAttribute('data-module'));
            const lessonIndex = parseInt(this.getAttribute('data-lesson'));
            
            navigateToLesson(moduleIndex, lessonIndex);
        });
    });
    
    function navigateToLesson(moduleIndex, lessonIndex) {
        // Remove active class from all lessons
        lessons.forEach(l => l.classList.remove('active'));
        
        // Add active class to selected lesson
        const selectedLesson = document.querySelector(`.lesson[data-module="${moduleIndex}"][data-lesson="${lessonIndex}"]`);
        if (selectedLesson) {
            selectedLesson.classList.add('active');
            
            // Update lesson title and module title
            const lessonTitle = selectedLesson.querySelector('.lesson-title').textContent;
            currentLessonTitle.textContent = lessonTitle;
            
            const moduleTitle = document.querySelectorAll('.module-title')[moduleIndex].textContent;
            currentModuleTitle.textContent = `Module ${moduleIndex + 1}: ${moduleTitle}`;
            
            // Update navigation buttons
            updateNavigationButtons(moduleIndex, lessonIndex);
            
            // Update next button text
            updateNextButtonText(moduleIndex, lessonIndex);
        }
    }
    
    function updateNavigationButtons(moduleIndex, lessonIndex) {
        // Disable previous button if on first lesson
        prevLessonBtn.disabled = (moduleIndex === 0 && lessonIndex === 0);
        
        // Disable next button if on last lesson of last module
        const modules = document.querySelectorAll('.module');
        const lastModuleIndex = modules.length - 1;
        const lastModuleLessons = modules[lastModuleIndex].querySelectorAll('.lesson');
        const lastLessonIndex = lastModuleLessons.length - 1;
        
        nextLessonBtn.disabled = (moduleIndex === lastModuleIndex && lessonIndex === lastLessonIndex);
    }
    
    function updateNextButtonText(moduleIndex, lessonIndex) {
        const lessonId = `${moduleIndex}-${lessonIndex}`;
        
        if (completedLessons.includes(lessonId)) {
            nextLessonBtn.textContent = 'Next Lesson';
        } else {
            nextLessonBtn.textContent = 'Mark as Completed';
        }
    }
    
    // Navigation button functionality
    if (prevLessonBtn) {
        prevLessonBtn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const activeLesson = document.querySelector('.lesson.active');
            if (!activeLesson) return;
            
            const moduleIndex = parseInt(activeLesson.getAttribute('data-module'));
            const lessonIndex = parseInt(activeLesson.getAttribute('data-lesson'));
            
            if (lessonIndex > 0) {
                // Go to previous lesson in same module
                navigateToLesson(moduleIndex, lessonIndex - 1);
            } else if (moduleIndex > 0) {
                // Go to last lesson of previous module
                const prevModuleLessons = document.querySelectorAll(`.lesson[data-module="${moduleIndex - 1}"]`);
                const prevModuleLastLessonIndex = prevModuleLessons.length - 1;
                
                navigateToLesson(moduleIndex - 1, prevModuleLastLessonIndex);
            }
        });
    }
    
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const activeLesson = document.querySelector('.lesson.active');
            if (!activeLesson) return;
            
            const moduleIndex = parseInt(activeLesson.getAttribute('data-module'));
            const lessonIndex = parseInt(activeLesson.getAttribute('data-lesson'));
            const lessonId = `${moduleIndex}-${lessonIndex}`;
            
            // Mark lesson as completed if not already
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                activeLesson.classList.add('completed');
                
                // Update progress
                updateProgress();
                
                // Update next button text
                nextLessonBtn.textContent = 'Next Lesson';
                
                // If all lessons in module are completed, mark module as completed
                const moduleLessons = document.querySelectorAll(`.lesson[data-module="${moduleIndex}"]`);
                const allModuleLessonsCompleted = Array.from(moduleLessons).every(lesson => {
                    const lModuleIndex = parseInt(lesson.getAttribute('data-module'));
                    const lLessonIndex = parseInt(lesson.getAttribute('data-lesson'));
                    return completedLessons.includes(`${lModuleIndex}-${lLessonIndex}`);
                });
                
                if (allModuleLessonsCompleted) {
                    document.querySelectorAll('.module')[moduleIndex].classList.add('completed');
                }
                
                return;
            }
            
            // Navigate to next lesson
            const modules = document.querySelectorAll('.module');
            const currentModuleLessons = document.querySelectorAll(`.lesson[data-module="${moduleIndex}"]`);
            
            if (lessonIndex < currentModuleLessons.length - 1) {
                // Go to next lesson in same module
                navigateToLesson(moduleIndex, lessonIndex + 1);
            } else if (moduleIndex < modules.length - 1) {
                // Go to first lesson of next module
                navigateToLesson(moduleIndex + 1, 0);
            }
        });
    }
    
    // Update progress function
    function updateProgress() {
        const totalLessons = document.querySelectorAll('.lesson').length;
        const completedCount = completedLessons.length;
        const progressPercent = Math.round((completedCount / totalLessons) * 100);
        
        // Update progress elements
        document.getElementById('completed-count').textContent = completedCount;
        document.getElementById('total-lessons').textContent = totalLessons;
        document.getElementById('progress-percent').textContent = `${progressPercent}%`;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    }
    
    // Initialize with first lesson
    navigateToLesson(0, 0);
    updateProgress();
});