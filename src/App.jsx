import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetails from './pages/ServiceDetails.jsx';
import Booking from './pages/Booking.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
