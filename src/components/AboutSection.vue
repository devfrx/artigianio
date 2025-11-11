<template>
  <section class="about-section">
    <!-- Background Pattern -->
    <div class="about-background">
      <div class="pattern-overlay"></div>
      <div class="grain-texture"></div>
    </div>

    <div class="about-content container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-badge">
          <Icon icon="ph:heart-fill" class="badge-icon" />
          <span class="badge-text">La Storia dell'Artigiano</span>
        </div>
        <h2 class="section-title title-font">L'Arte del Legno</h2>
        <p class="section-subtitle">
          Tradizione, passione e maestria si incontrano per dare vita a creazioni uniche
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="about-grid">
        <!-- Image Section -->
        <div class="about-visual">
          <div class="image-composition">
            <!-- Main Image -->
            <div class="main-image-container">
              <div class="image-frame">
                <img :src="artisan.photo" :alt="artisan.name" class="artisan-image" />
                <div class="image-overlay">
                  <div class="overlay-quote">
                    <Icon icon="ph:quotes-fill" class="quote-icon" />
                    <p class="quote-text">
                      "Ogni pezzo racconta una storia di passione e dedizione"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative Elements -->
            <div class="decorative-element element-tools">
              <div class="deco-card">
                <Icon icon="ph:hammer-fill" class="deco-icon" />
                <span class="deco-text">Strumenti Tradizionali</span>
              </div>
            </div>

            <div class="decorative-element element-wood">
              <div class="deco-card">
                <Icon icon="ph:tree-fill" class="deco-icon" />
                <span class="deco-text">Legno Selezionato</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="about-text">
          <div class="artisan-intro">
            <h3 class="artisan-name">{{ artisan.name }}</h3>
            <div class="experience-highlight">
              <div class="experience-number">{{ artisan.experience }}+</div>
              <div class="experience-label">Anni di Esperienza</div>
            </div>
          </div>

          <div class="artisan-story">
            <p class="story-text">{{ artisan.description }}</p>
          </div>

          <!-- Skills Section -->
          <div class="skills-section">
            <h4 class="skills-title">
              <Icon icon="ph:medal-fill" class="skills-icon" />
              Cosa mi riesce meglio?
            </h4>
            <div class="skills-grid">
              <div
                v-for="(skill, index) in artisan.skills"
                :key="skill"
                class="skill-card"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="skill-icon-wrapper">
                  <Icon :icon="getSkillIcon(skill)" class="skill-icon" />
                </div>
                <span class="skill-name">{{ skill }}</span>
              </div>
            </div>
          </div>

          <!-- Values Section -->
          <div class="values-section">
            <div class="value-item">
              <Icon icon="ph:leaf-fill" class="value-icon" />
              <div class="value-content">
                <h5 class="value-title">Sostenibilità</h5>
                <p class="value-desc">
                  Propensione al riciclo e al riutilizzo di oggetti in modo creativo
                </p>
              </div>
            </div>
            <div class="value-item">
              <Icon icon="ph:handshake-fill" class="value-icon" />
              <div class="value-content">
                <h5 class="value-title">Su Misura</h5>
                <p class="value-desc">Ogni progetto è unico e personalizzato</p>
              </div>
            </div>
            <!-- <div class="value-item">
              <Icon icon="ph:trophy-fill" class="value-icon" />
              <div class="value-content">
                <h5 class="value-title">Qualità</h5>
                <p class="value-desc">Garanzia di durata nel tempo</p>
              </div>
            </div> -->
          </div>

          <!-- CTA -->
          <div class="about-cta">
            <button class="contact-button" @click="scrollToContact">
              <span class="button-text">Contattami per un Progetto</span>
              <Icon icon="ph:arrow-right-bold" class="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Artisan {
  name: string
  description: string
  photo: string
  skills: string[]
  experience: number
}

interface Props {
  artisan: Artisan
}

defineProps<Props>()

const getSkillIcon = (skill: string): string => {
  const iconMap: Record<string, string> = {
    Restauro: 'ph:wrench-fill',
    'Finitura naturale': 'ph:paint-brush-fill',
    'Lavorazione su misura': 'ph:ruler-fill',
    Creatività: 'ph:lightbulb-fill',
  }
  return iconMap[skill] || 'ph:star-fill'
}

const scrollToContact = () => {
  const contactSection = document.querySelector('.contact-section')
  contactSection?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.about-section {
  position: relative;
  padding: var(--section-gap) 0;
  overflow: hidden;
}

.about-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    var(--color-background-soft) 0%,
    var(--color-background) 50%,
    var(--color-background-mute) 100%
  );
}

.grain-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.02) 0%, transparent 50%);
}

.about-content {
  position: relative;
  z-index: 1;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--space-20);
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary-dark));
  color: white;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-6);
  animation: gentle-pulse 3s ease-in-out infinite;
}

.badge-icon {
  font-size: var(--font-size-base);
}

@keyframes gentle-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.section-title {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-tight);
}

.section-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Main Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-20);
  align-items: start;
}

/* Visual Section */
.about-visual {
  position: relative;
}

.image-composition {
  position: relative;
}

.main-image-container {
  position: relative;
}

.image-frame {
  position: relative;
  border-radius: var(--radius-frame-outer);
  overflow: hidden;
  background: var(--color-surface);
  padding: var(--radius-frame-padding);
  box-shadow: var(--shadow-wood-lg);
  transition: var(--transition-all);
}

.image-frame:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
}

.artisan-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: var(--radius-frame-inner);
  transition: var(--transition-transform);
}

.image-overlay {
  position: absolute;
  top: var(--radius-frame-padding);
  left: var(--radius-frame-padding);
  right: var(--radius-frame-padding);
  bottom: var(--radius-frame-padding);
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.85), rgba(160, 82, 45, 0.75));
  border-radius: var(--radius-frame-inner);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-all);
}

.image-frame:hover .image-overlay {
  opacity: 1;
}

.overlay-quote {
  text-align: center;
  color: white;
  padding: var(--space-8);
}

.quote-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  opacity: 0.7;
}

.quote-text {
  font-size: var(--font-size-xl);
  font-style: italic;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-relaxed);
}

/* Decorative Elements */
.decorative-element {
  position: absolute;
  z-index: 2;
}

.element-tools {
  top: var(--space-8);
  right: -var(--space-6);
  animation: float-gentle-1 6s ease-in-out infinite;
}

.element-wood {
  bottom: var(--space-12);
  left: -var(--space-8);
  animation: float-gentle-2 8s ease-in-out infinite;
}

@keyframes float-gentle-1 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
}

@keyframes float-gentle-2 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(-2deg);
  }
}

.deco-card {
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-card-outer);
  box-shadow: var(--shadow-wood);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  position: relative;
  overflow: hidden;
}

.deco-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

.deco-icon {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
}

.deco-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
}

/* Text Content */
.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.artisan-intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-6);
  border-bottom: 2px solid var(--color-border);
}

.artisan-name {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: var(--line-height-tight);
}

.experience-highlight {
  text-align: center;
}

.experience-number {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-primary);
  line-height: 1;
}

.experience-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-1);
}

.story-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text);
}

/* Skills Section */
.skills-section {
  background: var(--color-surface);
  padding: var(--space-8);
  border-radius: var(--radius-container-outer);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-base);
}

.skills-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  margin-bottom: var(--space-6);
}

.skills-icon {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.skill-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-background);
  padding: var(--space-4);
  border-radius: var(--radius-card-outer);
  border: 1px solid var(--color-border);
  transition: var(--transition-all);
  animation: fade-in-up 0.6s ease-out both;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  background: var(--color-surface-hover);
}

.skill-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary));
  border-radius: var(--radius-lg);
  color: white;
}

.skill-icon {
  font-size: var(--font-size-lg);
}

.skill-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* Values Section */
.values-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-card-outer);
  border-left: 4px solid var(--color-primary);
  transition: var(--transition-all);
}

.value-item:hover {
  background: var(--color-surface-hover);
  transform: translateX(8px);
}

.value-icon {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-top: var(--space-1);
}

.value-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  margin-bottom: var(--space-1);
}

.value-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
}

/* CTA */
.about-cta {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.contact-button {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: white;
  border: none;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-button-outer);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-all);
  box-shadow: var(--shadow-wood);
  position: relative;
  overflow: hidden;
}

.contact-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.contact-button:hover::before {
  left: 100%;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-wood-lg);
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-lighter));
}

.button-icon {
  font-size: var(--font-size-xl);
  transition: var(--transition-transform);
}

.contact-button:hover .button-icon {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--space-16);
  }

  .about-visual {
    order: -1;
  }

  .artisan-intro {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: var(--section-gap-sm) 0;
  }

  .section-header {
    margin-bottom: var(--space-16);
  }

  .section-title {
    font-size: var(--font-size-4xl);
  }

  .section-subtitle {
    font-size: var(--font-size-lg);
  }

  .about-grid {
    gap: var(--space-12);
  }

  .artisan-image {
    height: 400px;
  }

  .decorative-element {
    display: none;
  }

  .artisan-name {
    font-size: var(--font-size-3xl);
  }

  .experience-number {
    font-size: var(--font-size-3xl);
  }

  .story-text {
    font-size: var(--font-size-base);
  }

  .values-section {
    gap: var(--space-3);
  }

  .value-item {
    padding: var(--space-3);
  }

  .contact-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section-badge {
    font-size: var(--font-size-xs);
    padding: var(--space-1) var(--space-3);
  }

  .skills-section,
  .values-section {
    padding: var(--space-6);
  }

  .overlay-quote {
    padding: var(--space-4);
  }

  .quote-text {
    font-size: var(--font-size-lg);
  }
}
</style>
