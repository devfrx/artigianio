<template>
  <section class="contact-section">
    <div class="contact-content container">
      <div class="contact-header">
        <h2 class="contact-title">Contattaci</h2>
        <p class="contact-subtitle">
          Interessato a una creazione personalizzata? Parliamone insieme.
        </p>
      </div>

      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">
            <Icon icon="ph:envelope-fill" />
          </div>
          <div class="contact-details">
            <h4>Email</h4>
            <p>{{ contact.email }}</p>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <Icon icon="ph:phone-fill" />
          </div>
          <div class="contact-details">
            <h4>Telefono</h4>
            <p>{{ contact.phone }}</p>
          </div>
        </div>

        <!-- <div class="contact-item">
          <div class="contact-icon">
            <Icon icon="ph:map-pin-fill" />
          </div>
          <div class="contact-details">
            <h4>Laboratorio</h4>
            <p>{{ contact.address }}</p>
          </div>
        </div> -->
      </div>

      <div class="social-links" v-if="contact.social">
        <a
          v-for="(link, platform) in contact.social"
          :key="platform"
          :href="link"
          target="_blank"
          class="social-link"
        >
          <Icon :icon="getSocialIcon(platform)" />
          <span>{{ platform }}</span>
        </a>
      </div>

      <div class="admin-access">
        <router-link to="/admin/login" class="admin-link">
          <Icon icon="ph:gear" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Contact {
  email: string
  phone: string
  address: string
  social?: Record<string, string>
}

interface Props {
  contact: Contact
}

defineProps<Props>()

const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    Instagram: 'ph:instagram-logo-fill',
    Facebook: 'ph:facebook-logo-fill',
    Twitter: 'ph:twitter-logo-fill',
    LinkedIn: 'ph:linkedin-logo-fill',
    YouTube: 'ph:youtube-logo-fill',
  }
  return icons[platform] || 'ph:link-fill'
}
</script>

<style scoped>
.contact-section {
  padding: var(--section-gap) 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  text-align: center;
  position: relative;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wood-grain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0,10 Q5,5 10,10 T20,10" stroke="rgba(255,255,255,0.05)" fill="none" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23wood-grain)"/></svg>');
  opacity: 0.1;
}

.contact-content {
  position: relative;
  z-index: 1;
}

.contact-header {
  margin-bottom: var(--space-12);
}

.contact-title {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-4);
  font-weight: var(--font-weight-bold);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.contact-subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-12);
  opacity: 0.95;
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: rgba(255, 255, 255, 0.15);
  padding: var(--space-6);
  border-radius: var(--radius-container-outer);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition-all);
  position: relative;
  overflow: hidden;
}

.contact-item::before {
  content: '';
  position: absolute;
  top: var(--space-1);
  left: var(--space-1);
  right: var(--space-1);
  bottom: var(--space-1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-3xl);
  pointer-events: none;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.contact-icon {
  font-size: var(--font-size-4xl);
  width: var(--space-16);
  height: var(--space-16);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  flex-shrink: 0;
  transition: var(--transition-transform);
  position: relative;
  z-index: 1;
}

.contact-item:hover .contact-icon {
  transform: scale(1.1);
}

.contact-details {
  text-align: left;
  flex: 1;
}

.contact-details h4 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-semibold);
}

.contact-details p {
  opacity: 0.95;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.social-link {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: var(--transition-all);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.admin-access {
  margin-top: var(--space-8);
  text-align: center;
}

.admin-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--space-8);
  height: var(--space-8);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: var(--transition-all);
  font-size: var(--font-size-sm);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .contact-section {
    padding: var(--section-gap-sm) 0;
  }

  .contact-info {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .contact-title {
    font-size: var(--font-size-4xl);
  }

  .contact-subtitle {
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-8);
  }

  .contact-item {
    padding: var(--space-4);
    gap: var(--space-3);
  }

  .contact-icon {
    width: var(--space-12);
    height: var(--space-12);
    font-size: var(--font-size-2xl);
  }

  .contact-details h4 {
    font-size: var(--font-size-lg);
  }

  .contact-details p {
    font-size: var(--font-size-sm);
  }

  .social-links {
    gap: var(--space-2);
  }

  .social-link {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
  }
}
</style>
