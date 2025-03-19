<template>
    <div class="contact-page">
      <app-navigation />
      <div class="contact-container">
        <div class="contact-info">
          <div class="contact-details">
            <h1>Contact Sharenet</h1>
            <div class="contact-section">
              <h2>Office Address</h2>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                123 Financial Street, Sandton
                Johannesburg, 2196, South Africa
              </p>
            </div>
            
            <div class="contact-section">
              <h2>Contact Information</h2>
              <p>
                <i class="fas fa-phone"></i>
                +27 11 123 4567
              </p>
              <p>
                <i class="fas fa-envelope"></i>
                support@sharenet.co.za
              </p>
            </div>
            
            <div class="contact-section">
              <h2>Business Hours</h2>
              <p>
                <i class="fas fa-clock"></i>
                Monday - Friday: 8:00 AM - 5:00 PM
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>
          
          <div class="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.5117767893196!2d28.047583!3d-26.1046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c6f17868e4f%3A0x1e95228b0a31c49!2sSandton!5e0!3m2!1sen!2sza!4v1623345600000!5m2!1sen!2sza" 
              width="100%" 
              height="450" 
              style="border:0;" 
              :allowfullscreen="true" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                :required="true" 
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                :required="true" 
              />
            </div>
            
            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea 
                id="message" 
                v-model="message" 
                :required="true" 
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  
  export default defineComponent({
    name: 'ContactPage',
    components: {
      AppNavigation
    },
    setup() {
      const name = ref('');
      const email = ref('');
      const message = ref('');
  
      const submitForm = () => {
        // Implement form submission logic
        console.log('Form submitted', { 
          name: name.value, 
          email: email.value, 
          message: message.value 
        });
        
        // Reset form
        name.value = '';
        email.value = '';
        message.value = '';
      };
  
      return {
        name,
        email,
        message,
        submitForm
      };
    }
  });
  </script>
  
  <style scoped>
  .contact-page {
    background-color: #f4f6f9;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .contact-info {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .contact-details {
    padding: 30px;
  }
  
  .contact-section {
    margin-bottom: 20px;
  }
  
  .contact-section h2 {
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
    margin-bottom: 15px;
    color: #333;
  }
  
  .contact-section i {
    margin-right: 10px;
    color: #007bff;
  }
  
  .map-container {
    width: 100%;
  }
  
  .contact-form {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .form-group textarea {
    height: 150px;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }
  </style>