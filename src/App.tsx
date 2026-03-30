import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { PlaceholderPage } from '@/pages/placeholder-page'
import { TicketDetailPage } from '@/components/ticket-detail/ticket-detail-page'
import { TicketsPage } from '@/pages/tickets-page'
import { ObjectsPage } from '@/pages/objects-page'
import { ObjectDetailPage } from '@/pages/object-detail-page'
import { SchedulePage } from '@/pages/schedule-page'
import { PlannerPage } from '@/pages/planner-page'
import { AdminsPage } from '@/pages/admins-page'
import { CustomersPage } from '@/pages/customers-page'
import { ContractorsPage } from '@/pages/contractors-page'
import { LoginPage } from '@/pages/login-page'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Публичные маршруты - без AppShell */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* 👇 Защищенные маршруты - с AppShell */}
        <Route element={<AppShell />}>
          <Route index element={<TicketsPage />} />
          <Route path="tickets/schedule" element={<SchedulePage />} />
          <Route path="tickets/marking" element={<PlaceholderPage title="Маркировка" />} />
          <Route path="tickets/planner" element={<PlannerPage />} />
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          
          <Route path="objects" element={<ObjectsPage />} />
          <Route path="objects/:id" element={<ObjectDetailPage />} />
          
          <Route path="users/admins" element={<AdminsPage />} />
          <Route path="users/customers" element={<CustomersPage />} />
          <Route path="users/contractors" element={<ContractorsPage />} />
          
          <Route path="companies" element={<PlaceholderPage title="Компании" />} />
          <Route path="messages" element={<PlaceholderPage title="Сообщения" />} />
          <Route path="checklists" element={<PlaceholderPage title="Чек-листы" />} />
          <Route path="warehouses" element={<PlaceholderPage title="Склады | Материалы" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
