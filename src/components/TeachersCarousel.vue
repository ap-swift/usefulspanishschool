<template>
  <div class="teachers-carousel-container">
    <h2>Наши преподаватели</h2>
    <div class="teachers-carousel">
      <swiper :slides-per-view="isMobile ? 1.5 : 3" :space-between="20" class="mySwiper">
        <swiper-slide v-for="teacher in teachers" :key="teacher.id">
          <div class="teacher-card">
            <img :src="teacher.photo" :alt="teacher.name" class="teacher-photo" />
            <div class="teacher-info">
              <h3>{{ teacher.name }}</h3>
              <p>{{ teacher.description }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import photo1 from '@/assets/images/photo1.jpeg';
import photo2 from '@/assets/images/photo2.jpeg';
import photo3 from '@/assets/images/photo3.jpeg';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      teachers: [
        { id: 1, name: 'Преподаватель 1', description: 'Описание 1', photo: photo1 },
        { id: 2, name: 'Преподаватель 2', description: 'Описание 2', photo: photo2 },
        { id: 3, name: 'Преподаватель 3', description: 'Описание 3', photo: photo3 },
        // Добавьте других преподавателей по мере необходимости
      ],
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768; // Проверка на мобильное устройство при загрузке компонента
    window.addEventListener('resize', this.updateWindowSize); // Слушатель изменения размера окна
  },
  methods: {
    updateWindowSize() {
      this.isMobile = window.innerWidth <= 768; // Обновление состояния для мобильного устройства
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowSize); // Удаление слушателя перед выгрузкой компонента
  },
};
</script>

<style scoped>
.teachers-carousel-container {
  padding: 1rem; /* Отступы вокруг контейнера */
  max-width: 1000px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрируем контейнер */
}

h2 {
  font-size: 2rem; /* Размер шрифта */
  margin-bottom: 1.5rem; /* Отступ снизу */
  color: #333; /* Цвет текста */
  text-align: center; /* Выравнивание текста по центру */
  font-weight: bold; /* Полужирное начертание */
  padding: 10px 20px; /* Отступы внутри заголовка */
  border-bottom: 2px solid #4CAF50; /* Нижняя граница */
  background-color: #fff; /* Фон заголовка */
}

.teachers-carousel {
  padding: 0; /* Убираем отступы внутри карусели */
}

.teacher-card {
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.teacher-photo {
  width: 100%;
  height: auto;
  display: block;
}

.teacher-info {
  padding: 1rem;
}

.teacher-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.teacher-info p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.5rem; /* Уменьшаем размер шрифта заголовка для мобильных устройств */
  }
  
  .swiper-slide {
    width: 100%; /* Ширина слайда на мобильных устройствах */
    margin: 0; /* Убираем отступы на мобильных устройствах */
  }
}
</style>
