import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  Globe, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  X, 
  Send, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getTravelAdvice } from './services/geminiService';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your JONABDAM TRAVELS assistant. How can I help you plan your family's next adventure?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getTravelAdvice(userMessage, []);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I'm sorry, I couldn't process that. Please try again." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-2 rounded-lg">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">JONABDAM TRAVELS</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-brand-600 transition-colors">Services</a>
              <a href="#booking" className="hover:text-brand-600 transition-colors">Book Consultation</a>
              <a href="#destinations" className="hover:text-brand-600 transition-colors">Destinations</a>
              <a href="#booking" className="bg-brand-600 text-white px-6 py-2.5 rounded-full hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
                Get Started
              </a>
            </div>
            <div className="md:hidden">
              <Menu className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/family-travel/1920/1080" 
            alt="Family traveling abroad" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-brand-500/30">
              Expert Travel Consultation
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Create Unforgettable <span className="text-brand-400">Family Memories</span> Abroad
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              We handle the logistics, you handle the memories. Professional consultation for international family travel, visa assistance, and bespoke itineraries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="bg-brand-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-900/20">
                Start Planning Now <ArrowRight className="w-5 h-5" />
              </a>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
                View Destinations
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Seamless Travel Experiences</h2>
            <p className="text-slate-600">From passport renewals to luxury family villas, we provide end-to-end support for your international journeys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                <Plane className="text-brand-600 w-7 h-7" />
              </div>
              <img 
                src="https://picsum.photos/seed/airplane/400/250" 
                alt="Airplane" 
                className="w-full h-48 object-cover rounded-2xl mb-6"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flight Coordination</h3>
              <p className="text-slate-600 mb-4">We find the best family-friendly routes and handle all booking complexities for a smooth take-off.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Priority Seating</li>
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Lounge Access</li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-brand-600 w-7 h-7" />
              </div>
              <img 
                src="https://picsum.photos/seed/passport/400/250" 
                alt="Passports" 
                className="w-full h-48 object-cover rounded-2xl mb-6"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visa & Documentation</h3>
              <p className="text-slate-600 mb-4">Expert guidance on passport requirements and visa applications for every country on your list.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Document Review</li>
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Expedited Processing</li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-brand-600 w-7 h-7" />
              </div>
              <img 
                src="https://picsum.photos/seed/family-vacation/400/250" 
                alt="Family Vacation" 
                className="w-full h-48 object-cover rounded-2xl mb-6"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bespoke Itineraries</h3>
              <p className="text-slate-600 mb-4">Custom-tailored travel plans that cater to both children and adults for the perfect balance.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Kid-Friendly Activities</li>
                <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Private Tours</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">Consultation</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Speak with a <span className="text-brand-600">Travel Expert</span> Today
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Fill out the form to schedule a one-on-one session with our senior consultants. We'll discuss your dream destination, budget, and family requirements.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">30-Minute Discovery Call</h4>
                    <p className="text-slate-500 text-sm">A free initial session to understand your travel goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Virtual or In-Person</h4>
                    <p className="text-slate-500 text-sm">We can meet via Zoom or at our offices in the city center.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm">
              {bookingStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Received!</h3>
                  <p className="text-slate-600 mb-8">A representative from JONABDAM TRAVELS will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setBookingStatus('idle')}
                    className="text-brand-600 font-semibold hover:underline"
                  >
                    Book another session
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Preferred Destination</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="e.g. Paris, Tokyo" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Additional Details</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all h-24 resize-none" placeholder="Tell us about your family and travel preferences..."></textarea>
                  </div>
                  <button 
                    disabled={bookingStatus === 'submitting'}
                    className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {bookingStatus === 'submitting' ? 'Processing...' : 'Confirm Booking Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for your next family adventure?</h2>
          <p className="text-brand-100 mb-10 text-lg max-w-2xl mx-auto">Join over 5,000 families who have explored the world with JONABDAM TRAVELS' expert guidance.</p>
          <a href="#booking" className="inline-block bg-white text-brand-900 px-10 py-4 rounded-full font-bold hover:bg-brand-50 transition-all shadow-2xl">
            Schedule a Free Call
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-md">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">JONABDAM TRAVELS</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-brand-600">Privacy Policy</a>
              <a href="#" className="hover:text-brand-600">Terms of Service</a>
              <a href="#" className="hover:text-brand-600">Contact</a>
            </div>
            <p className="text-sm text-slate-400">© 2026 JONABDAM TRAVELS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-[350px] sm:w-[400px] h-[500px] glass-card rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Travel Assistant</h4>
                    <p className="text-[10px] text-brand-100">Powered by JONABDAM TRAVELS AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'
                    }`}>
                      <div className="markdown-body">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about destinations, visas..."
                    className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <button 
                    disabled={isLoading || !input.trim()}
                    className="bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-600 text-white p-4 rounded-full shadow-2xl shadow-brand-500/40 flex items-center justify-center relative"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
