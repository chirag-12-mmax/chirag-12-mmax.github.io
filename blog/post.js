// Add copy code functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add copy buttons to code blocks
    document.querySelectorAll('pre code').forEach((codeBlock) => {
        const container = codeBlock.parentNode;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        container.appendChild(copyButton);

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                copyButton.textContent = 'Error';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }
        });
    });

    // Smooth scrolling for table of contents
    document.querySelectorAll('.table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const title = document.title;
            const url = window.location.href;
            
            if (button.querySelector('.fa-twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                window.open(twitterUrl, '_blank');
            } else if (button.querySelector('.fa-linkedin')) {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedinUrl, '_blank');
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.subscribe-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            try {
                // Here you would typically send this to your backend
                console.log('Newsletter subscription:', email);
                emailInput.value = '';
                alert('Thank you for subscribing!');
            } catch (err) {
                console.error('Newsletter subscription failed:', err);
                alert('Subscription failed. Please try again.');
            }
        });
    }

    // Add active state to current section in table of contents
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.table-of-contents a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all section headings
    document.querySelectorAll('.content-section h2').forEach(heading => {
        if (heading.id) {
            observer.observe(heading);
        }
    });

    // Add reading time estimate
    const articleText = document.querySelector('.post-body').textContent;
    const wordCount = articleText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const readingTimeElement = document.createElement('span');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.textContent = `${readingTime} min read`;
    document.querySelector('.post-meta').appendChild(readingTimeElement);
}); 