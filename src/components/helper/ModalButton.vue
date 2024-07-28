<template>
  <div>
    <button @click="openModal" class="open-modal-btn">{{ buttonText }}</button>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" @click="closeModal" class="close-btn">×</button>
        <slot name="modal-header">
          <h2>Готовы начать?</h2>
        </slot>
        <slot name="modal-body">
          <h3>Запишитесь на свой первый урок со скидкой! И оставайтесь с нами если вам понравится!</h3>
        </slot>
        <form @submit.prevent="submitForm" novalidate>
          <div>
            <label for="contact">{{ contactLabel }}</label>
            <input type="text" v-model="contact" required ref="contactInput" />
            <span v-if="contactError" class="error-message">{{ contactError }}</span>
          </div>
          <button type="submit" class="submit-btn">{{ submitButtonText }}</button>
        </form>
      </div>
    </div>
    
    <Notification ref="notification" />
  </div>
</template>

<script>
import Notification from './Notification.vue';

export default {
  components: {
    Notification,
  },
  props: {
    buttonText: {
      type: String,
      default: 'Оставить заявку',
    },
    contactLabel: {
      type: String,
      default: 'Ваш Telegram аккаунт или WhatsApp:',
    },
    submitButtonText: {
      type: String,
      default: 'Оставьте заявку и мы с вами свяжемся',
    },
    className: {
      type: String,
      default: '',
    },
    endpoint: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      contact: '',
      contactError: '',
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.contact = '';
      this.contactError = '';
    },
    submitForm() {
      if (!this.contact) {
        this.contactError = 'Пожалуйста, заполните это поле';
        this.$refs.contactInput.focus();
        return;
      }

      // Закрываем модальное окно и показываем уведомление о процессе отправки данных
      this.closeModal();
      this.$refs.notification.show('Отправка данных...');

      fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: this.contact }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        this.$refs.notification.show('Ваш контакт успешно отправлен!');
      })
      .catch(error => {
        console.error('Ошибка:', error);
        this.$refs.notification.show('Произошла ошибка при отправке данных.');
      });
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  max-width: 300px; 
  max-height: 50px;
}

.open-modal-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.open-modal-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-content h3 {
  margin: 0.5rem 0 1rem;
  font-size: 1.1rem;
  color: #555;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.close-btn:hover {
  background: #d32f2f;
  transform: scale(1.1);
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1rem;
}

.submit-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}
</style>
