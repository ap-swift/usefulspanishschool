<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <!-- Секция с формой контактов -->
      <section v-if="!showCourseDetails">
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
      </section>

      <!-- Секция с каруселью преподавателей -->
      <section v-if="!showCourseDetails">
        <TeachersCarousel />
      </section>
      
      <!-- Секция с кнопкой "Все курсы" -->
      <section v-if="showCourseDetails">
        <button @click="showAllCourses" class="all-courses-btn">Все курсы</button>
      </section>

      <!-- Секция для отображения курсов или деталей курса -->
      <section v-if="!showCourseDetails">
        <CoursesList @courseSelected="handleCourseSelected" />
      </section>
      <section v-if="showCourseDetails">
        <router-view @backToCourses="backToCourses" />
      </section>
      
      <!-- Секция с описанием школы -->
      <section v-if="!showCourseDetails">
        <SchoolDescription />
      </section>
    </main>
    
    <!-- Футер -->
    <footer>
      <p>&copy; 2024 Онлайн школа испанского языка</p>
    </footer>
  </div>
</template>

<script>
import CoursesList from './components/CoursesList.vue';
import { ref } from 'vue';
import TeachersCarousel from './components/TeachersCarousel.vue';
import SchoolDescription from './components/SchoolDescription.vue';
import ModalButton from './components/helper/ModalButton.vue';

export default {
  components: {
    ModalButton,
    CoursesList,
    TeachersCarousel,
    SchoolDescription
  },
  setup() {
    const showCourseDetails = ref(false);

    const handleCourseSelected = () => {
      showCourseDetails.value = true;
    };

    const backToCourses = () => {
      showCourseDetails.value = false;
    };

    const showAllCourses = () => {
      showCourseDetails.value = false;
    };

    return {
      showCourseDetails,
      handleCourseSelected,
      backToCourses,
      showAllCourses,
    };
  },
  data() {
    return {
      title: "Онлайн школа испанского языка"
    }
  },
  methods: {
  }
};
</script>

<style>
/* Основные стили */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* Убирает горизонтальную прокрутку */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 1rem;
}

section {
  margin-bottom: 2rem;
}

footer {
  background-color: #4CAF50;
  color: white;
  text-align: center;
  padding: 1rem;
}

/* Кнопка "Все курсы" */
.all-courses-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.all-courses-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  header {
    padding: 0.5rem;
  }

  header h1 {
    font-size: 1.5rem;
  }

  main {
    padding: 0.5rem;
  }

  section {
    margin-bottom: 1rem;
  }

  .all-courses-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  footer {
    padding: 0.5rem;
  }
}
</style>
