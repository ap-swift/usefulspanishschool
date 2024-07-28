<template>
  <div :class="ClassName">
    <h2>{{ CourseName }}</h2>
    <p>{{ CourseDescription }}</p>
    <ModalButton 
      :button-text="'Оставить заявку'" 
      :contact-label="'Ваш Telegram аккаунт или WhatsApp:'" 
      :submit-button-text="'Оставьте заявку и мы с вами свяжемся'"
      :class-name="'course-details'"
      :endpoint="'http://localhost:10000/submit'"
    >
      <template v-slot:modal-header>
        <h2>Готовы начать?</h2>
      </template>
      <template v-slot:modal-body>
        <h3>Запишитесь на свой первый урок со скидкой! И оставайтесь с нами если вам понравится!</h3>
      </template>
    </ModalButton>
    <Notification ref="notification" />
  </div>
</template>

<script>
import { courses } from '../../data/courseData.js';
import ModalButton from '../helper/ModalButton.vue';
import Notification from '../helper/Notification.vue';

export default {
  components: {
    ModalButton,
    Notification,
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    courseData() {
      return courses[this.courseId];
    },
    ClassName() {
      return this.courseData.ClassName;
    },
    CourseName() {
      return this.courseData.CourseName;
    },
    CourseDescription() {
      return this.courseData.CourseDescription;
    }
  },
};
</script>

<style scoped>
/* Add or update your styles here */
.course-details {
  max-width: 1400px;
  min-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.course-details h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.course-details p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

/* Additional styles for the ModalButton and Notification can be added or overridden here */
</style>
