import { createSlice } from '@reduxjs/toolkit';

// Загружаем сохраненных пользователей из localStorage
const loadUsersFromStorage = () => {
  try {
    const savedUsers = localStorage.getItem('users');
    // Начальные тестовые пользователи
    const defaultUsers = [
      {
        id: 1,
        name: 'Администратор',
        username: 'admin',
        email: 'admin@example.com',
        password: '1234',
        isAdmin: true,
      },
      {
        id: 2,
        name: 'Пользователь',
        username: 'user',
        email: 'user@example.com',
        password: 'user',
        isAdmin: false,
      }
    ];
    
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      // Если нет сохраненных пользователей, сохраняем тестовых
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  } catch (error) {
    console.error('Ошибка загрузки пользователей из localStorage:', error);
    return [];
  }
};

const initialState = {
  users: loadUsersFromStorage(),
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Регистрация нового пользователя
    registerUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(), // Уникальный ID
        isAdmin: false, // Новые пользователи не админы
      };
      
      // Проверяем, не существует ли уже пользователь с таким email
      const existingUser = state.users.find(u => u.email === newUser.email);
      if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
      }
      
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
      return state;
    },
    
    // Вход пользователя
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      
      // Ищем пользователя по us rname или email
      const user = state.users.find(u => 
        (u.username === username || u.email === username) && u.password === password
      );
      
      if (user) {
        // Не сохраняем пароль в currentUser для безопасности
        const { password, ...userWithoutPassword } = user;
        state.currentUser = userWithoutPassword;
        return { ...state, currentUser: userWithoutPassword };
      } else {
        throw new Error('Неверное имя пользователя или пароль');
      }
    },
    
    // Выход
    logoutUser: (state) => {
      state.currentUser = null;
    },
    
    // Обновление данных пользователя
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        localStorage.setItem('users', JSON.stringify(state.users));
        
        // Обновляем currentUser если это текущий пользователь
        if (state.currentUser?.id === action.payload.id) {
          const { password, ...userWithoutPassword } = state.users[index];
          state.currentUser = userWithoutPassword;
        }
      }
    },
  },
});

export const { registerUser, loginUser, logoutUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;