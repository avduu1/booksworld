// التعامل مع إرسال نموذج القصة
document.getElementById('add-story-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // الحصول على البيانات من النموذج
    const title = document.getElementById('story-title').value;
    const content = document.getElementById('story-content').value;

    if (title && content) {
        // جلب القصص المخزنة حاليًا من LocalStorage
        const stories = JSON.parse(localStorage.getItem('add-story.html')) || [];

        // إضافة القصة الجديدة إلى القائمة
        stories.push({ title, content });

        // تخزين القصص المحدثة
        localStorage.setItem('add-story.html', JSON.stringify(stories));

        // عرض رسالة نجاح
        document.getElementById('success-message').style.display = 'block';

        // إعادة تعيين الحقول
        document.getElementById('add-story-form').reset();
    } else {
        alert('يرجى ملء جميع الحقول!');
    }
});

// عرض القصص في صفحة القصص (في ملف stories.html)
if (window.location.pathname.includes('stories.html')) {
    const stories = JSON.parse(localStorage.getItem('add-story.html')) || [];
    const storiesContainer = document.getElementById('stories-container');

    if (stories.length > 0) {
        stories.forEach((story) => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story');

            storyElement.innerHTML = `
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <hr>
            `;

            storiesContainer.appendChild(storyElement);
        });
    } else {
        storiesContainer.innerHTML = '<p>لا توجد قصص حتى الآن. كن أول من يضيف قصة!</p>';
    }
}
