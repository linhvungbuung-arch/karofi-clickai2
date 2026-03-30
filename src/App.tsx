import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Droplets, 
  ThermometerSun, 
  ThermometerSnowflake, 
  Smartphone, 
  ShieldCheck, 
  Settings2, 
  Award, 
  Zap, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronRight,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the provided Google Apps Script Web App URL
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxE_lyFBvtQS8QmQwN4Dn8SYPFuagE-s9z8BgHGuW7Q7Es81MH-oJdZKixke-Wrww/exec";
      
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors", // Required for Google Apps Script
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsCheckoutOpen(false);
        setFormData({ name: "", email: "", phone: "", address: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-slate-900" : "text-slate-900 md:text-white"}`}>
              KAROFI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"}`}>Tính năng</a>
            <a href="#technology" className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"}`}>Công nghệ</a>
            <a href="#design" className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"}`}>Thiết kế</a>
            <a href="#certifications" className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"}`}>Chứng nhận</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-lg shadow-blue-600/20"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Mua ngay
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu className={isScrolled ? "text-slate-900" : "text-slate-900"} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 bg-white shadow-xl z-40 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 font-medium">Tính năng</a>
              <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 font-medium">Công nghệ</a>
              <a href="#design" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 font-medium">Thiết kế</a>
              <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 font-medium">Chứng nhận</a>
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-50 -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn}>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none mb-6 px-3 py-1 text-sm font-medium rounded-full">
                  Siêu phẩm mới 2026
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Karofi PLATINUM S6 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Khởi tạo kỷ nguyên
                </span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Khơi nguồn sống khỏe với công nghệ lọc 12 lõi SMAX MASTER. Bổ sung Hydro-ion kiềm, gấp 2 khoáng chất. Trải nghiệm thay lõi 1 chạm đột phá.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 mb-10">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-base font-medium shadow-xl shadow-blue-600/20"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Mua ngay
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">3</div>
                  <div className="text-sm text-slate-500 font-medium">Chế độ nước</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">12</div>
                  <div className="text-sm text-slate-500 font-medium">Lõi lọc SMAX</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">5 <span className="text-lg">Sao</span></div>
                  <div className="text-sm text-slate-500 font-medium">Bảo hành</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://karofi.karofi.com/karofi-com/2026/01/karofi-platinum-s6-1.png" 
                alt="Karofi PLATINUM S6" 
                className="w-full max-w-md object-contain rounded-2xl drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <ThermometerSun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Nóng nhanh</div>
                  <div className="font-bold text-slate-900">99°C</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Lạnh sâu</div>
                  <div className="font-bold text-slate-900">Block siêu tốc</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Bento Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trải nghiệm tiện nghi đỉnh cao</h2>
            <p className="text-lg text-slate-600">
              Karofi PLATINUM S6 mang đến giải pháp nước sạch toàn diện với những công nghệ tiên tiến nhất, đáp ứng mọi nhu cầu của gia đình hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: 3 Chế độ nước */}
            <Card className="md:col-span-2 bg-slate-50 border-none shadow-sm overflow-hidden group">
              <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                <div className="p-8 sm:w-1/2 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">3 Chế độ nước linh hoạt</h3>
                  <p className="text-slate-600 mb-6">
                    Nóng nhanh - Lạnh sâu - Nguội. Trọn vẹn tiện nghi cho mọi nhu cầu từ pha trà, cà phê, sữa đến giải khát ngày hè.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Nóng đến 99°C
                    </li>
                    <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Lạnh sâu bằng công nghệ Block
                    </li>
                  </ul>
                </div>
                <div className="sm:w-1/2 relative min-h-[250px] bg-slate-200 overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/watermodes/600/500" 
                    alt="3 Water Modes" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: One Touch */}
            <Card className="bg-blue-600 text-white border-none shadow-md overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                    <Settings2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">One Touch Filter</h3>
                  <p className="text-blue-100 mb-6">
                    Tái định nghĩa việc thay lõi thành trải nghiệm 1 chạm. Hệ thống chống tràn tự động nhờ công nghệ Auto Valve hiện đại.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-fit bg-transparent border-white/30 text-white hover:bg-white hover:text-blue-600 rounded-full"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Mua ngay
                </Button>
              </CardContent>
            </Card>

            {/* Feature 3: AioTec */}
            <Card className="bg-slate-900 text-white border-none shadow-md overflow-hidden group">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Công nghệ AioTec</h3>
                <p className="text-slate-400 mb-6 flex-grow">
                  Giám sát chất lượng nước toàn diện hàng ngày qua ứng dụng trên điện thoại. An tâm tuyệt đối mọi lúc mọi nơi.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 font-medium cursor-pointer group-hover:gap-3 transition-all">
                  Tải ứng dụng <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Hydro-ion */}
            <Card className="md:col-span-2 bg-slate-50 border-none shadow-sm overflow-hidden group">
              <CardContent className="p-0 flex flex-col sm:flex-row-reverse h-full">
                <div className="p-8 sm:w-1/2 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Bổ sung Hydro-ion Kiềm</h3>
                  <p className="text-slate-600 mb-6">
                    Gấp 2 khoáng chất thiết yếu. Nước không chỉ sạch mà còn tốt cho sức khỏe, hỗ trợ cân bằng pH, chống oxy hóa hiệu quả.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white">Smax Master Mineral Plus</Badge>
                    <Badge variant="secondary" className="bg-white">Smax Master Alkaline Plus</Badge>
                  </div>
                </div>
                <div className="sm:w-1/2 relative min-h-[250px] bg-slate-200 overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/hydroion/600/500" 
                    alt="Hydro-ion Alkaline" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none mb-4">Hệ thống lọc 12 lõi</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">SMAX MASTER Hiệu Suất Cao</h2>
            <p className="text-lg text-slate-400">
              Gấp 2 hiệu suất - Gấp 2 khoáng chất. Công nghệ lọc tiên tiến nhất từ Karofi mang đến nguồn nước tinh khiết tuyệt đối.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl"
            >
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-600 mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">Lọc thô Smax Master F1-2-3</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gấp 2 hiệu quả lọc, gấp 3 diện tích tiếp xúc. Loại bỏ hoàn toàn cặn bẩn, rỉ sét, mùi clo và các chất hữu cơ độc hại ngay từ bước đầu tiên.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">Màng RO 100 GPD (Mỹ)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Trái tim của hệ thống lọc, sản xuất tại Mỹ. Loại bỏ 99.99% virus, vi khuẩn, amip, asen, các ion kim loại nặng và các chất độc hại trong nước.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl"
            >
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-cyan-600 mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">SMAX MASTER HP 6.0</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Thiết kế nguyên khối đột phá. Chống rò rỉ tối đa, dễ dàng thay thế. Bổ sung dồi dào khoáng chất, tạo vị ngọt tự nhiên cho nước.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-[40px] transform -rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://picsum.photos/seed/design/800/900" 
                alt="Crystal Aqua Design" 
                className="w-full rounded-[32px] shadow-xl object-cover"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Tủ đựng đồ tiện lợi</h4>
                <p className="text-sm text-slate-500">Tối ưu không gian với ngăn chứa đồ rộng rãi, tay nắm mở tủ linh hoạt, tinh tế.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Thiết kế Crystal Aqua</h2>
              <p className="text-lg text-slate-600 mb-8">
                Dấu ấn khác biệt trong không gian sống hiện đại. Mặt kính cường lực tràn viền, đường nét tinh xảo, màu sắc sang trọng tôn lên vẻ đẹp cho mọi gian bếp.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Mặt kính cường lực cao cấp</h4>
                    <p className="text-slate-600">Chống xước, dễ dàng vệ sinh, duy trì vẻ đẹp sáng bóng theo thời gian.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                    <Settings2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Kiểu dáng nguyên khối</h4>
                    <p className="text-slate-600">Thiết kế liền mạch, chắc chắn, bảo vệ tối ưu hệ thống linh kiện bên trong.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Warranty */}
      <section id="certifications" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Chất lượng được kiểm chứng</h2>
            <p className="text-lg text-slate-600">
              Karofi tự hào là thương hiệu máy lọc nước đạt những tiêu chuẩn khắt khe nhất trong nước và quốc tế.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Chuẩn Quốc gia QCVN 6-1:2010/BYT</h3>
                <p className="text-sm text-slate-600">
                  Nước sau lọc đạt Quy chuẩn Kỹ thuật Quốc gia đối với nước khoáng thiên nhiên và nước uống đóng chai. Uống trực tiếp không cần đun sôi.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Chứng nhận NSF/ANSI 58 (Mỹ)</h3>
                <p className="text-sm text-slate-600">
                  Karofi đạt chứng nhận NSF/ANSI 58 cao cấp của Mỹ, khẳng định chất lượng màng lọc RO và vật liệu an toàn tuyệt đối.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-blue-50">
              <CardContent className="pt-6">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-black text-blue-600">5★</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Bảo hành 5 sao</h3>
                <p className="text-sm text-slate-600">
                  Sẵn sàng linh hoạt để dẫn đầu thị trường. Dịch vụ chăm sóc khách hàng tận tâm, bảo hành dài hạn mang lại sự an tâm tối đa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sở hữu ngay Karofi PLATINUM S6</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Nâng tầm không gian sống, bảo vệ sức khỏe gia đình bạn ngay hôm nay với siêu phẩm máy lọc nước thế hệ mới.
          </p>
              <div className="flex justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-50 rounded-full px-12 h-14 text-lg font-bold shadow-xl shadow-white/10"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  K
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  KAROFI
                </span>
              </div>
              <p className="text-sm mb-6 max-w-md">
                Chuyên gia lọc nước thông minh. Mang đến giải pháp nước sạch toàn diện, an toàn và tiện nghi cho hàng triệu gia đình Việt.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Karofi PLATINUM S6</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Máy lọc nước nóng lạnh</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lõi lọc nước</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Phụ kiện</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Bảo hành 5 sao</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hệ thống phân phối</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
            <p>&copy; 2026 Karofi. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsCheckoutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              {isSubmitted ? (
                <div className="p-12 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Đặt hàng thành công!</h3>
                  <p className="text-slate-600">Cảm ơn bạn đã tin tưởng Karofi. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-4">Thông tin đặt hàng</h3>
                      <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                          <img 
                            src="https://karofi.karofi.com/karofi-com/2026/01/karofi-platinum-s6-1.png" 
                            alt="Karofi Platinum S6" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm text-blue-100 font-medium">Karofi Platinum S6</div>
                          <div className="text-xl font-bold">21.990.000 VNĐ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Họ và tên</label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Email</label>
                        <input 
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Số điện thoại</label>
                        <input 
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="09xx xxx xxx"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Địa chỉ đặt hàng</label>
                      <textarea 
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-blue-600/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                    </Button>
                    
                    <p className="text-center text-xs text-slate-400 mt-4">
                      Bằng cách nhấn xác nhận, bạn đồng ý với các điều khoản mua hàng của Karofi.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
