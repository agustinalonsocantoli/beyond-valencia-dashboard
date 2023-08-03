// Chakra UI
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
// Prime React
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
// React
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { RouterController } from './shared/components/RouterController/RouterController';
import { AuthContext } from './shared/context/auth.context';
import { useEffect, useState } from 'react';
import { UpdateUserInt, UserInt } from './interfaces/UserInt';
import { StatusEnumTypes } from './shared/Types/StatusEnumTypes';
import { toastNotify } from './shared/utils/toastNotify';
import { Sidebar } from './shared/components/Sidebar/Sidebar';
import { SidebarView } from './shared/context/sidebar.context';

function App() {
  const login = (
    jwt: string,
    user: UserInt,
    navigate: (path: string) => void
  ) => {

    const perfilUser: UserInt = {
      auth: true,
      id: user?.id,
      email: user?.email,
      username: user?.username ? user.username : '',
      firstName: user?.firstName,
      lastName: user?.lastName,
    }

    localStorage.setItem('token', jwt)
    localStorage.setItem('perfil', JSON.stringify(perfilUser))

    setUser(perfilUser);

    navigate('/experiences')
  };

  const logout = (
    navigate: (path: string) => void,
    toast: any,
  ) => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');

    setUser({
      auth: false,
      id: null,
      email: null,
      username: null,
      firstName: null,
      lastName: null,
    });

    navigate('/login')
    toastNotify(toast, StatusEnumTypes.INFO, "Sesion finalizada")
  };

  const refreshUser = async (updateUser: UpdateUserInt) => {
    for (const [key, value] of Object.entries(updateUser)) {
      if (key) {
        setUser((prev: UserInt) => ({
          ...prev,
          [key]: value
        }));
      }
    }
  };

  const perfilUser: UserInt = JSON.parse(localStorage.getItem('perfil') || '{}');
  const [user, setUser] = useState<UserInt>({
    auth: localStorage.getItem('token') ? true : false,
    id: perfilUser?.id ? perfilUser.id : null,
    email: perfilUser?.email ? perfilUser.email : null,
    username: perfilUser?.username ? perfilUser.username : null,
    firstName: perfilUser?.firstName ? perfilUser.firstName : null,
    lastName: perfilUser?.lastName ? perfilUser.lastName : null,
  });

  useEffect(() => {
    localStorage.setItem('perfil', JSON.stringify(user))

  }, [user])

  const [sidebarView, setSidebarView] = useState<boolean>(true)

  return (
    <Router basename='/'>
      <AuthContext.Provider value={{ user, setUser, login, logout, refreshUser }}>
        <SidebarView.Provider value={{ sidebarView, setSidebarView }}>
          <ChakraProvider>
            <Flex>
              {user.auth && sidebarView && <Sidebar />}

              <RouterController />
            </Flex>
          </ChakraProvider>
        </SidebarView.Provider>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
