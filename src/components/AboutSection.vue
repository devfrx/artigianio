<template>
  <section class="about-section">
    <div class="about-content container">
      <div class="about-text">
        <h2 class="about-title">L'Artigiano</h2>
        <h3 class="artisan-name">{{ artisan.name }}</h3>
        <p class="artisan-description">{{ artisan.description }}</p>

        <div class="artisan-skills">
          <h4>Specializzazioni</h4>
          <ul class="skills-list">
            <li v-for="skill in artisan.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>

        <div class="artisan-experience">
          <span class="experience-badge"> {{ artisan.experience }} anni di esperienza </span>
        </div>
      </div>

      <div class="about-image">
        <img :src="artisan.photo" :alt="artisan.name" />
        <div class="image-overlay">
          <p class="overlay-text">"Ogni pezzo racconta una storia"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.about-section {
  padding: var(--section-gap) 0;
  background: var(--color-background-soft);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.about-title {
  font-size: var(--font-size-4xl);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
  font-weight: var(--font-weight-bold);
}

.artisan-name {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  margin-bottom: var(--space-6);
  font-weight: var(--font-weight-semibold);
}

.artisan-description {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text);
  margin-bottom: var(--space-8);
}

.artisan-skills h4 {
  font-size: var(--font-size-xl);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
  font-weight: var(--font-weight-semibold);
}

.skills-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.skills-list li {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light));
  color: var(--vt-c-text-light-1);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-all);
}

.skills-list li:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.experience-badge {
  background: var(--color-background-mute);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  color: var(--vt-c-text-dark-1);
  display: inline-block;
  border: 2px solid var(--color-primary-light);
  transition: var(--transition-all);
}

.experience-badge:hover {
  background: var(--color-primary-light);
  color: var(--vt-c-text-light-2);
  transform: translateY(-2px);
}

.about-image {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-wood-lg);
  transition: var(--transition-transform);
}

.about-image:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}

.about-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: var(--transition-transform);
}

.about-image:hover img {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: var(--space-8);
  color: white;
}

.overlay-text {
  font-size: var(--font-size-xl);
  font-style: italic;
  text-align: center;
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .about-section {
    padding: var(--section-gap-sm) 0;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .about-title {
    font-size: var(--font-size-3xl);
  }

  .artisan-name {
    font-size: var(--font-size-2xl);
  }

  .artisan-description {
    font-size: var(--font-size-base);
  }

  .about-image {
    order: -1;
  }

  .about-image img {
    height: 300px;
  }

  .image-overlay {
    padding: var(--space-4);
  }

  .overlay-text {
    font-size: var(--font-size-lg);
  }
}
</style>
