   // Loading Screen
        window.addEventListener('load', () => {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth Scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Contact Form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // WhatsApp message
            const whatsappMessage = `Olá! Meu nome é ${name}.
            
Email: ${email}
Telefone: ${phone}

Mensagem: ${message}

Vim através do site da Humans MK e gostaria de saber mais sobre os serviços.`;
            
            const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Service cards hover effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Testimonial cards stagger animation
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Portfolio items hover effect
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.innerHTML = '📱 Ver Projeto';
                this.style.cursor = 'pointer';
            });
            
            item.addEventListener('mouseleave', function() {
                this.innerHTML = `Case de Sucesso #${Array.from(document.querySelectorAll('.portfolio-item')).indexOf(this) + 1}`;
            });
        });

        // Add click effect to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    background-color: rgba(255,255,255,0.6);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Auto-scroll for hero section text
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                typeWriter();
            }, 1200);
        }

        // Chatbot Functionality
        class Chatbot {
            constructor() {
                this.isOpen = false;
                this.isTyping = false;
                this.initializeElements();
                this.bindEvents();
            }

            initializeElements() {
                this.toggle = document.getElementById('chatbotToggle');
                this.window = document.getElementById('chatbotWindow');
                this.close = document.getElementById('chatbotClose');
                this.messages = document.getElementById('chatbotMessages');
                this.input = document.getElementById('chatbotInput');
                this.sendButton = document.getElementById('sendButton');
                this.typingIndicator = document.getElementById('typingIndicator');
            }

            bindEvents() {
                this.toggle.addEventListener('click', () => this.toggleChat());
                this.close.addEventListener('click', () => this.closeChat());
                this.sendButton.addEventListener('click', () => this.sendMessage());
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });

                // Quick actions
                document.querySelectorAll('.quick-action').forEach(button => {
                    button.addEventListener('click', () => {
                        const message = button.getAttribute('data-message');
                        this.input.value = message;
                        this.sendMessage();
                    });
                });

                // Auto-resize input
                this.input.addEventListener('input', () => {
                    this.sendButton.disabled = this.input.value.trim() === '';
                });
            }

            toggleChat() {
                if (this.isOpen) {
                    this.closeChat();
                } else {
                    this.openChat();
                }
            }

            openChat() {
                this.isOpen = true;
                this.window.classList.add('active');
                this.toggle.innerHTML = '×';
                this.input.focus();
                this.scrollToBottom();
            }

            closeChat() {
                this.isOpen = false;
                this.window.classList.remove('active');
                this.toggle.innerHTML = '💬';
            }

            async sendMessage() {
                const message = this.input.value.trim();
                if (!message || this.isTyping) return;

                // Add user message
                this.addMessage(message, 'user');
                this.input.value = '';
                this.sendButton.disabled = true;

                // Show typing indicator
                this.showTyping();

                try {
                    const response = await fetch('api/chatbot.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message: message })
                    });

                    const data = await response.json();
                    
                    this.hideTyping();

                    if (data.response) {
                        this.addMessage(data.response, 'bot');
                    } else if (data.fallback) {
                        this.addMessage(data.fallback, 'bot');
                    } else {
                        this.addMessage('Desculpe, não consegui processar sua mensagem. Tente novamente ou entre em contato conosco pelo WhatsApp: (11) 99999-9999', 'bot');
                    }
                } catch (error) {
                    this.hideTyping();
                    this.addMessage('Desculpe, estou com dificuldades técnicas no momento. Entre em contato conosco pelo WhatsApp: (11) 99999-9999', 'bot');
                }
            }

            addMessage(content, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}`;
                
                const avatar = document.createElement('div');
                avatar.className = 'message-avatar';
                avatar.textContent = sender === 'bot' ? '🤖' : '👤';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = content;
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(messageContent);
                
                this.messages.appendChild(messageDiv);
                this.scrollToBottom();
            }

            showTyping() {
                this.isTyping = true;
                this.typingIndicator.classList.add('active');
                this.scrollToBottom();
            }

            hideTyping() {
                this.isTyping = false;
                this.typingIndicator.classList.remove('active');
            }

            scrollToBottom() {
                setTimeout(() => {
                    this.messages.scrollTop = this.messages.scrollHeight;
                }, 100);
            }
        }

        // Initialize chatbot when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new Chatbot();
        });