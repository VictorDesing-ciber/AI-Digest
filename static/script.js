const overlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalTag = document.getElementById('modalTag');
const cardData = {};

document.querySelectorAll('.card').forEach(card => {
    cardData[card.dataset.id] = {
        title: card.querySelector('.card-title').textContent,
        tag: card.querySelector('.card-tag').textContent,
    };
});

async function openCard(id) {
    try {
        const res = await fetch(`/api/card/${id}`);
        const data = await res.json();

        modalBody.innerHTML = data.content;
        modalTag.textContent = data.tag;
        modalTag.style.background = data.color + '20';
        modalTag.style.color = data.color;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (err) {
        console.error('Ошибка загрузки:', err);
    }
}

function closeModal(e) {
    if (e && e.target !== overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Intersection Observer для карточек
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});
