<template>
  <div class="course-list">
    <h2 class="title">Наши курсы</h2>
    <ul>
      <li v-for="course in courses" :key="course.id">
        <router-link :to="{ name: course.routeName }" @click.native="courseSelected">
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        { id: 1, title: 'Испанский для матерей по родам', description: 'Слова и выражения, используемые в больнице для родящих.', routeName: 'maternidad' },
        { id: 2, title: 'Курс испанского в Миграционке', description: 'Рассматриваются кейсы подачи с использованием испанского языка.', routeName: 'migracion' },
        { id: 3, title: 'Практика испанского языка с носителем', description: 'Нужна программа, топики.', routeName: 'nativo' },
        { id: 4, title: 'Курс про историю Аргентины и про Аргентинцев', description: 'Описание курса про историю Аргентины.', routeName: 'argentina-identidad' },
        { id: 5, title: 'Курс по лексикону для университета', description: 'Описание курса по лексикону для университета.', routeName: 'universidad-escuela' },
      ],
    };
  },
  methods: {
    courseSelected() {
      this.$emit('courseSelected');
    },
  },
};
</script>

<style scoped>
.course-list {
  padding: 1rem;
}

.title {
  font-size: 2rem; /* Размер шрифта для заголовка */
  margin-bottom: 1.5rem; /* Отступ снизу */
  color: #333; /* Цвет текста */
  text-align: center; /* Выравнивание текста по центру */
  font-weight: bold; /* Полужирное начертание */
  border-bottom: 2px solid #4CAF50; /* Нижняя граница */
  background-color: #fff; /* Фон заголовка */
  padding: 0.5rem 1rem; /* Отступы внутри заголовка */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  transition: transform 0.3s, box-shadow 0.3s;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h3 {
  margin: 0;
}

p {
  margin: 0.5rem 0 0;
  color: #555;
}

router-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem; /* Уменьшаем размер шрифта заголовка на мобильных устройствах */
  }

  li {
    padding: 0.75rem 0; /* Уменьшаем отступы в элементах списка на мобильных устройствах */
  }
}
</style>
