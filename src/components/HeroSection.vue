<template>
  <section class="hero">
    <!-- Background Pattern -->
    <div class="hero-background">
      <div class="wood-pattern"></div>
      <div class="grain-overlay"></div>
    </div>

    <div class="hero-content container">
      <div class="hero-text">
        <div class="hero-badge">
          <Icon icon="ph:sparkle-fill" class="badge-icon" />
          <span class="badge-text">Artigianato Tradizionale</span>
        </div>

        <h1 class="hero-title">
          <span class="title-main">{{ title }}</span>
          <!-- <span class="title-accent">Dal 2000</span> -->
        </h1>

        <p class="hero-slogan">{{ slogan }}</p>
        <p class="hero-description">{{ description }}</p>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">25+</span>
            <span class="stat-label">Anni di Esperienza</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">200+</span>
            <span class="stat-label">Creazioni Realizzate</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Fatto a Mano</span>
          </div>
        </div>

        <div class="hero-actions">
          <button class="cta-button primary" @click="scrollToProducts">
            <span class="button-text">Scopri le Creazioni</span>
            <Icon icon="ph:arrow-right-bold" class="button-icon" />
          </button>
          <button class="cta-button secondary" @click="scrollToAbout">
            <span class="button-text">Conosci l'Artigiano</span>
            <Icon icon="ph:user-bold" class="button-icon" />
          </button>
        </div>

        <!-- Trust Indicators -->
        <div class="trust-indicators">
          <div class="trust-item">
            <Icon icon="ph:trophy-fill" class="trust-icon" />
            <span class="trust-text">Qualità Certificata</span>
          </div>
          <div class="trust-item">
            <Icon icon="ph:leaf-fill" class="trust-icon" />
            <span class="trust-text">Legno Sostenibile</span>
          </div>
          <div class="trust-item">
            <Icon icon="ph:lightning-fill" class="trust-icon" />
            <span class="trust-text">Consegna Rapida</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="image-container">
          <div class="image-frame">
            <img :src="heroImage" :alt="title" class="hero-image" />
            <div class="image-overlay">
              <div class="overlay-content">
                <span class="overlay-badge">Lavorazione Artigianale</span>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="floating-element element-1">
            <div class="float-card">
              <Icon icon="ph:hammer-fill" class="float-icon" />
              <span class="float-text">Strumenti Tradizionali</span>
            </div>
          </div>

          <div class="floating-element element-2">
            <div class="float-card">
              <Icon icon="ph:crosshair-simple-fill" class="float-icon" />
              <span class="float-text">Precisione Millimetrica</span>
            </div>
          </div>

          <div class="floating-element element-3">
            <div class="float-card">
              <Icon icon="ph:diamond-fill" class="float-icon" />
              <span class="float-text">Finitura Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  title: string
  slogan: string
  description: string
  heroImage: string
}

defineProps<Props>()

const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToAbout = () => {
  const aboutSection = document.querySelector('.about-section')
  aboutSection?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.wood-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    var(--color-background) 0%,
    var(--color-background-soft) 100%
  );
  opacity: 0.9;
}

.grain-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.02) 0%, transparent 50%),
    linear-gradient(
      45deg,
      transparent 48%,
      rgba(139, 69, 19, 0.01) 49%,
      rgba(139, 69, 19, 0.01) 51%,
      transparent 52%
    );
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-20);
  align-items: center;
  width: 100%;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  align-self: flex-start;
  margin-bottom: var(--space-2);
  background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary-dark));
  color: var(--vt-c-text-light-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border: 1px solid var(--color-primary-light);
  animation: pulse-glow 3s ease-in-out infinite;
}

.badge-icon {
  font-size: var(--font-size-base);
}

@keyframes pulse-glow {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 20px 5px rgba(139, 69, 19, 0.1);
  }
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.title-main {
  font-size: var(--font-size-7xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-heading);
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--vt-c-text-dark-1) 0%, var(--vt-c-text-dark-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-accent {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  font-style: italic;
  position: relative;
}

.title-accent::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), transparent);
  border-radius: var(--radius-full);
}

.hero-slogan {
  font-size: var(--font-size-3xl);
  font-style: italic;
  color: var(--color-primary-lighter);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  margin-bottom: var(--space-2);
}

.hero-description {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-8);
  max-width: 90%;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  padding: var(--space-4) 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-1);
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: var(--space-12);
  background: var(--color-border);
  opacity: 0.5;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.cta-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  border: none;
  border-radius: var(--radius-button-outer);
  cursor: pointer;
  transition: var(--transition-all);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  padding: var(--space-4) var(--space-6);
  position: relative;
  overflow: hidden;
}

.cta-button.primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: white;
  box-shadow: var(--shadow-wood);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-wood-lg);
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-lighter));
}

.cta-button.secondary {
  background: var(--color-surface);
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary-light);
  box-shadow: var(--shadow-base);
}

.cta-button.secondary:hover {
  background: var(--color-secondary-lighter);
  color: var(--color-secondary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button-icon {
  transition: var(--transition-transform);
  font-size: var(--font-size-lg);
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

.trust-indicators {
  display: flex;
  gap: var(--space-8);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.trust-icon {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.trust-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.hero-visual {
  position: relative;
}

.image-container {
  position: relative;
}

.image-frame {
  position: relative;
  border-radius: var(--radius-frame-outer);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  background: var(--color-surface);
  padding: var(--radius-frame-padding);
}

.hero-image {
  width: 100%;
  height: 800px;
  object-fit: cover;
  border-radius: var(--radius-frame-inner);
  transition: var(--transition-transform);
}

/* .image-frame:hover .hero-image {
  transform: scale(1.02);
} */

.image-overlay {
  position: absolute;
  top: var(--radius-frame-padding);
  left: var(--radius-frame-padding);
  right: var(--radius-frame-padding);
  bottom: var(--radius-frame-padding);
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(160, 82, 45, 0.8));
  border-radius: var(--radius-frame-inner);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-all);
}

/* .image-frame:hover .image-overlay {
  opacity: 1;
} */

.overlay-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.floating-element {
  position: absolute;
  z-index: 2;
}

.element-1 {
  top: var(--space-8);
  right: -var(--space-4);
  animation: float-1 6s ease-in-out infinite;
}

.element-2 {
  bottom: var(--space-16);
  left: -var(--space-6);
  animation: float-2 8s ease-in-out infinite;
}

.element-3 {
  top: 50%;
  right: -var(--space-8);
  animation: float-3 7s ease-in-out infinite;
}

@keyframes float-1 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

@keyframes float-3 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-25px) rotate(7deg);
  }
}

.float-card {
  background: var(--color-surface);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-card-outer);
  box-shadow: var(--shadow-wood);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.float-card::before {
  content: '';
  position: absolute;
  top: var(--space-1);
  left: var(--space-1);
  right: var(--space-1);
  bottom: var(--space-1);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-card-inner);
  pointer-events: none;
}

.float-icon {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.float-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .hero {
    min-height: 100vh;
    padding: var(--space-8) 0;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    text-align: center;
  }

  .hero-visual {
    order: -1;
  }

  .title-main {
    font-size: var(--font-size-5xl);
  }

  .hero-slogan {
    font-size: var(--font-size-xl);
  }

  .hero-description {
    font-size: var(--font-size-lg);
    max-width: 100%;
  }

  .hero-stats {
    justify-content: center;
    gap: var(--space-4);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .trust-indicators {
    justify-content: center;
    gap: var(--space-4);
  }

  .hero-image {
    height: 400px;
  }

  .floating-element {
    display: none;
  }

  .hero-badge {
    font-size: var(--font-size-xs);
    padding: var(--space-1) var(--space-3);
  }
}

@media (max-width: 480px) {
  .hero-stats {
    flex-direction: column;
    gap: var(--space-4);
  }

  .stat-divider {
    display: none;
  }

  .trust-indicators {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>
