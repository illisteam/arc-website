import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Monitor, PenTool, Settings, Globe, X, Check } from 'lucide-react';
import { ServiceItem } from '../types';

const servicesEn: ServiceItem[] = [
  {
    title: 'Exhibition Planning',
    description: 'Strategic planning for global exhibitions including CES, MWC, and IFA.',
    icon: Globe,
    details: 'We provide comprehensive end-to-end planning for major international trade shows. Our approach begins with a deep analysis of your brand goals and visitor behavior to create a strategic roadmap. We handle everything from space analysis and visitor flow design to regulation compliance and on-site logistics, ensuring your exhibition presence is impactful and seamless.',
    features: ['Strategic Brand Analysis', 'Visitor Flow Optimization', 'Space & Regulation Management', 'Global Logistics Coordination']
  },
  {
    title: 'Visual Design',
    description: 'Immersive media art, 3D motion graphics, and booth identity design.',
    icon: PenTool,
    details: 'Our visual design team creates breathtaking immersive experiences that captivate audiences. We specialize in large-scale media art, 3D motion graphics, and cohesive booth identity design. By blending artistic creativity with cutting-edge display technology, we turn static spaces into dynamic, storytelling environments.',
    features: ['Immersive Media Art', '3D Motion Graphics', 'Booth Identity System', 'Interactive Content Design']
  },
  {
    title: 'System Installation',
    description: 'Professional setup of LED walls, transparent displays, and kinetic systems.',
    icon: Monitor,
    details: 'We deliver robust technical setups for the most demanding exhibition environments. Our expertise covers the installation of large-scale LED walls, transparent OLED displays, and complex kinetic systems. We ensure every pixel is perfect and every mechanism operates smoothly, providing a stable foundation for your digital content.',
    features: ['Large-scale LED Walls', 'Transparent & Flexible Displays', 'Kinetic Structures', 'Hardware Integration']
  },
  {
    title: 'Technical Operation',
    description: 'On-site technical direction and equipment management for flawless execution.',
    icon: Settings,
    details: 'Flawless execution is our promise. Our technical directors and operators manage the entire audiovisual ecosystem on-site. From live relay systems to real-time content synchronisation, we monitor and control all equipment to prevent issues before they arise, ensuring your event runs perfectly from start to finish.',
    features: ['On-site Technical Direction', 'Real-time System Monitoring', 'Live Event Operation', 'Emergency Troubleshooting']
  },
];

const servicesKo: ServiceItem[] = [
  {
    title: 'Exhibition Planning',
    description: 'CES, MWC, IFA를 포함한 글로벌 전시를 위한 전략적 기획.',
    icon: Globe,
    details: '주요 국제 무역 박람회를 위한 포괄적인 엔드 투 엔드 기획을 제공합니다. 우리의 접근 방식은 브랜드 목표와 방문객 행동에 대한 심층 분석에서 시작하여 전략적 로드맵을 작성합니다. 공간 분석 및 동선 설계부터 규정 준수 및 현장 물류까지 모든 것을 처리하여 전시 참여가 임팩트 있고 원활하게 진행되도록 보장합니다.',
    features: ['전략적 브랜드 분석', '관람객 동선 최적화', '전시 공간 및 규정 관리', '글로벌 물류 코디네이션']
  },
  {
    title: 'Visual Design',
    description: '몰입형 미디어 아트, 3D 모션 그래픽, 부스 아이덴티티 디자인.',
    icon: PenTool,
    details: '시각 디자인 팀은 관객을 사로잡는 놀라운 몰입형 경험을 창조합니다. 우리는 대규모 미디어 아트, 3D 모션 그래픽, 그리고 일관된 부스 아이덴티티 디자인을 전문으로 합니다. 예술적 창의성과 최첨단 디스플레이 기술을 융합하여 정적인 공간을 역동적인 스토리텔링 환경으로 변화시킵니다.',
    features: ['몰입형 미디어 아트', '3D 모션 그래픽', '부스 아이덴티티 시스템', '인터랙티브 콘텐츠 디자인']
  },
  {
    title: 'System Installation',
    description: 'LED 월, 투명 디스플레이, 키네틱 시스템의 전문적인 설치.',
    icon: Monitor,
    details: '가장 까다로운 전시 환경을 위한 견고한 기술 설정을 제공합니다. 대형 LED 월, 투명 OLED 디스플레이, 복잡한 키네틱 시스템 설치에 대한 전문 지식을 보유하고 있습니다. 모든 픽셀이 완벽하고 모든 메커니즘이 원활하게 작동하도록 하여 디지털 콘텐츠를 위한 안정적인 기반을 제공합니다.',
    features: ['대형 LED 월 설치', '투명 및 플렉서블 디스플레이', '키네틱 구조물', '하드웨어 통합']
  },
  {
    title: 'Technical Operation',
    description: '완벽한 실행을 위한 현장 기술 연출 및 장비 관리.',
    icon: Settings,
    details: '완벽한 실행은 우리의 약속입니다. 우리의 기술 감독과 운영자들은 현장에서 전체 시청각 생태계를 관리합니다. 라이브 중계 시스템부터 실시간 콘텐츠 동기화까지, 문제가 발생하기 전에 모든 장비를 모니터링하고 제어하여 행사가 처음부터 끝까지 완벽하게 진행되도록 보장합니다.',
    features: ['현장 기술 연출', '실시간 시스템 모니터링', '라이브 이벤트 운영', '비상 대응 및 문제 해결']
  },
];

const ServiceModal: React.FC<{ service: ServiceItem; onClose: () => void }> = ({ service, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-arc-black border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-arc-accent/10 rounded-lg">
              <service.icon className="w-8 h-8 text-arc-accent" />
            </div>
            <h3 className="text-3xl font-bold text-white">{service.title}</h3>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-white/5 pb-8">
            {service.details}
          </p>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Key Capabilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-300">
                  <Check size={16} className="text-arc-accent flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { language } = useLanguage();

  const services = language === 'ko' ? servicesKo : servicesEn;

  return (
    <section id="services" className="pt-24 pb-12 relative min-h-screen flex items-center">
      <AnimatePresence>
        {selectedService && (
          <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16">

          {/* Header - Updated with Brand Identity */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-sm md:text-base font-bold tracking-[0.3em] text-arc-accent uppercase mb-2">
                Brand Philosophy
              </h3>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                ALL / ROUNDER / COMPANY
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              {language === 'ko' ? (
                <>
                  우리는 창의적인 상상력과 기술적 실행 사이의 간극을 잇습니다.
                  <br className="hidden md:block" />
                  시스템 기획부터 콘텐츠 제작까지, 우리는 당신의 통합 파트너입니다.
                </>
              ) : (
                <>
                  We bridge the gap between creative imagination and technical execution.
                  <br className="hidden md:block" />
                  From system planning to content creation, we are your integrated partner.
                </>
              )}
            </motion.p>
          </div>

          {/* Services Grid
              ID added for ParticleNetwork to track position
          */}
          <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto w-full">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }} // Wait for particles to form the card first
                className="service-card p-10 rounded-2xl h-[280px] flex flex-col justify-center relative group bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer hover:bg-white/10"
                onClick={() => setSelectedService(service)}
              >
                {/* Content */}
                <div className="relative z-10">
                  <service.icon className="w-12 h-12 text-gray-400 group-hover:text-arc-accent mb-6 transition-colors duration-300" />
                  <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;