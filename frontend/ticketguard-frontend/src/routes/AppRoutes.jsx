import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import NotFound from "../pages/NotFound";

// Customer Pages
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import Tickets from "../pages/Tickets";

import Dashboard from "../pages/dashboard/Dashboard";
import MyBookings from "../pages/dashboard/MyBookings";
import MyPayments from "../pages/dashboard/MyPayments";
import MyTickets from "../pages/dashboard/MyTickets";
import Profile from "../pages/dashboard/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

import AdminEvents from "../pages/admin/AdminEvents";
import CreateEvent from "../pages/admin/CreateEvent";
import EditEvent from "../pages/admin/EditEvent";

import AdminVenues from "../pages/admin/AdminVenues";
import CreateVenue from "../pages/admin/CreateVenue";
import EditVenue from "../pages/admin/EditVenue";

import AdminUsers from "../pages/admin/AdminUsers";
import CreateUser from "../pages/admin/CreateUser";
import EditUser from "../pages/admin/EditUser";

import AdminBookings from "../pages/admin/AdminBookings";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminTickets from "../pages/admin/AdminTickets";

// Route Guards
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* ================= CUSTOMER ROUTES ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/booking/:id"
                    element={
                        <ProtectedRoute>
                            <Booking />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute>
                            <Tickets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-payments"
                    element={
                        <ProtectedRoute>
                            <MyPayments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-tickets"
                    element={
                        <ProtectedRoute>
                            <MyTickets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* ================= ADMIN ROUTES ================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                {/* Events */}

                <Route
                    path="/admin/events"
                    element={
                        <AdminRoute>
                            <AdminEvents />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/events/create"
                    element={
                        <AdminRoute>
                            <CreateEvent />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/events/edit/:id"
                    element={
                        <AdminRoute>
                            <EditEvent />
                        </AdminRoute>
                    }
                />

                {/* Venues */}

                <Route
                    path="/admin/venues"
                    element={
                        <AdminRoute>
                            <AdminVenues />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/venues/create"
                    element={
                        <AdminRoute>
                            <CreateVenue />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/venues/edit/:id"
                    element={
                        <AdminRoute>
                            <EditVenue />
                        </AdminRoute>
                    }
                />

                {/* Users */}

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users/create"
                    element={
                        <AdminRoute>
                            <CreateUser />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users/edit/:id"
                    element={
                        <AdminRoute>
                            <EditUser />
                        </AdminRoute>
                    }
                />

                {/* Bookings */}

                <Route
                    path="/admin/bookings"
                    element={
                        <AdminRoute>
                            <AdminBookings />
                        </AdminRoute>
                    }
                />

                {/* Payments */}

                <Route
                    path="/admin/payments"
                    element={
                        <AdminRoute>
                            <AdminPayments />
                        </AdminRoute>
                    }
                />

                {/* Tickets */}

                <Route
                    path="/admin/tickets"
                    element={
                        <AdminRoute>
                            <AdminTickets />
                        </AdminRoute>
                    }
                />

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;