import { useState } from 'react';
import { Section } from './components/Section';
import { SearchAssistant } from './components/SearchAssistant';
import { LiveGuideModal } from './components/LiveGuideModal';
import { Mic, MapPin, Heart, Coffee, Users } from 'lucide-react';
import { motion } from 'motion/react';

const CONTENT = {
  diadanh: {
    title: "Dấu Ấn Lịch Sử",
    subtitle: "Địa Danh",
    content: `Quảng Trị là mảnh đất mang trong mình những trang sử hào hùng và bi tráng nhất của dân tộc. 

Thành Cổ Quảng Trị không chỉ là một di tích, mà là một khúc tráng ca bất tử. Nơi đây đã chứng kiến 81 ngày đêm lịch sử năm 1972, nơi mỗi tấc đất đều thấm đẫm máu xương của những người anh hùng ngã xuống vì độc lập tự do.

Bên cạnh đó, Địa đạo Vịnh Mốc là minh chứng sống động cho sức sống mãnh liệt của con người Quảng Trị. Một "lũy thép dưới lòng đất" với hệ thống hầm ngầm phức tạp, nơi sự sống vẫn nảy mầm ngay dưới mưa bom bão đạn, thể hiện ý chí sinh tồn và khát vọng hòa bình bất diệt.`,
    image: "https://picsum.photos/seed/citadel/1000/1200"
  },
  vanhoa: {
    title: "Hồn Quê Đậm Đà",
    subtitle: "Văn Hoá",
    content: `Văn hóa Quảng Trị là sự giao thoa tinh tế giữa hai miền Nam - Bắc, mang những nét đặc trưng rất riêng của vùng đất nắng gió.

Nơi đây lưu giữ những làn điệu dân ca Bình Trị Thiên mộc mạc mà sâu lắng, những câu hò mái nhì, mái tấu chứa chan tình cảm. Các lễ hội truyền thống như Lễ hội đua thuyền trên sông Thạch Hãn, hay Lễ hội rước kiệu La Vang không chỉ là dịp sinh hoạt tín ngưỡng mà còn là sợi dây gắn kết cộng đồng bền chặt.

Tinh thần tôn sư trọng đạo, uống nước nhớ nguồn luôn được người dân nơi đây gìn giữ và truyền lại qua bao thế hệ, tạo nên một bản sắc văn hóa kiên cường nhưng cũng rất đỗi dịu dàng.`,
    image: "https://picsum.photos/seed/culture/1000/1200"
  },
  amthuc: {
    title: "Hương Vị Nắng Gió",
    subtitle: "Ẩm Thực",
    content: `Ẩm thực Quảng Trị mang đậm hương vị của miền Trung: cay nồng, đậm đà và dân dã.

Món Cháo vạt giường (cháo cá lóc Hải Lăng) là đặc sản không thể bỏ qua. Sợi bột gạo dai mềm hòa quyện cùng nước dùng ngọt thanh và thịt cá lóc săn chắc, thêm chút ớt cay nồng làm ấm lòng thực khách.

Thịt trâu lá trơng mang hương vị núi rừng đặc trưng, vị ngọt của thịt trâu kết hợp với vị cay nồng, thơm hăng của lá trơng tạo nên một trải nghiệm vị giác khó quên. Và không thể không nhắc đến Bánh lọc Mỹ Chánh, món bánh nhỏ xinh, trong vắt, gói ghém tinh túy từ củ sắn và tôm sông tươi rói.`,
    image: "https://picsum.photos/seed/food/1000/1200"
  },
  connguoi: {
    title: "Nghĩa Tình Trọn Vẹn",
    subtitle: "Con Người",
    content: `Sinh ra trên mảnh đất cằn cỗi, chịu nhiều đau thương của chiến tranh và sự khắc nghiệt của thiên tai, con người Quảng Trị đã rèn luyện cho mình một ý chí kiên cường, chịu thương chịu khó.

Họ không chỉ dũng cảm trong chiến đấu mà còn cần cù, sáng tạo trong lao động. Dù cuộc sống có khó khăn, người Quảng Trị vẫn luôn giữ nụ cười trên môi, sống chân chất, mộc mạc và vô cùng hiếu khách. 

Tình người nơi đây ấm áp như chính cái nắng của miền Trung, luôn sẵn sàng dang tay chào đón và giúp đỡ những người phương xa, để lại trong lòng du khách những ấn tượng khó phai về một vùng đất trọn vẹn nghĩa tình.`,
    image: "https://picsum.photos/seed/people/1000/1200"
  }
};

export default function App() {
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold text-olive">Quảng Trị</div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-gray-600">
            <a href="#diadanh" className="hover:text-rust transition-colors">Địa Danh</a>
            <a href="#vanhoa" className="hover:text-rust transition-colors">Văn Hoá</a>
            <a href="#amthuc" className="hover:text-rust transition-colors">Ẩm Thực</a>
            <a href="#connguoi" className="hover:text-rust transition-colors">Con Người</a>
          </div>
          <button 
            onClick={() => setIsLiveModalOpen(true)}
            className="flex items-center gap-2 bg-rust text-white px-5 py-2.5 rounded-full hover:bg-orange-700 transition-colors font-medium text-sm"
          >
            <Mic size={16} />
            <span className="hidden sm:inline">Hướng Dẫn Viên Ảo</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-olive leading-[1.1] tracking-tight mb-8">
              Quảng Trị <br/>
              <span className="text-rust font-light italic">trong mắt em</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mb-12">
              Mảnh đất kiên cường, nơi hoa nở trên đá, nơi tình người ấm áp xua tan giá lạnh của lịch sử.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#diadanh" className="flex items-center gap-2 bg-olive text-white px-6 py-3 rounded-full hover:bg-olive-dark transition-colors">
                <MapPin size={18} /> Khám phá ngay
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-olive rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-40 w-96 h-96 bg-rust rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Main Content Sections */}
      <Section 
        id="diadanh"
        title={CONTENT.diadanh.title}
        subtitle={CONTENT.diadanh.subtitle}
        content={CONTENT.diadanh.content}
        imageSrc={CONTENT.diadanh.image}
        imageAlt="Thành cổ Quảng Trị"
      />

      <Section 
        id="vanhoa"
        title={CONTENT.vanhoa.title}
        subtitle={CONTENT.vanhoa.subtitle}
        content={CONTENT.vanhoa.content}
        imageSrc={CONTENT.vanhoa.image}
        imageAlt="Văn hóa Quảng Trị"
        reverse
      />

      <Section 
        id="amthuc"
        title={CONTENT.amthuc.title}
        subtitle={CONTENT.amthuc.subtitle}
        content={CONTENT.amthuc.content}
        imageSrc={CONTENT.amthuc.image}
        imageAlt="Ẩm thực Quảng Trị"
      />

      <Section 
        id="connguoi"
        title={CONTENT.connguoi.title}
        subtitle={CONTENT.connguoi.subtitle}
        content={CONTENT.connguoi.content}
        imageSrc={CONTENT.connguoi.image}
        imageAlt="Con người Quảng Trị"
        reverse
      />

      {/* Search Assistant Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SearchAssistant />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-olive text-white/80 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-white mb-6">Quảng Trị Trong Mắt Em</h2>
          <p className="max-w-md mx-auto mb-8">Một dự án tôn vinh vẻ đẹp, lịch sử và con người của vùng đất miền Trung đầy nắng gió.</p>
          <div className="flex justify-center gap-6 mb-8">
            <MapPin size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Heart size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Coffee size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Users size={20} className="hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-sm">© 2026 Quảng Trị Trong Mắt Em. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <LiveGuideModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
    </div>
  );
}
