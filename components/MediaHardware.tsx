import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tv, Cast, Cpu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const itemsEn = [
    {
        title: 'LED Display',
        description: 'High-resolution indoor/outdoor LED cabinets for massive video walls.',
        icon: Monitor,
    },
    {
        title: 'Professional TV',
        description: 'Ultra-narrow bezel LCD video wall displays and standalone signage units.',
        icon: Tv,
    },
    {
        title: 'Digital Signage',
        description: 'Various form factors including kiosks, stretched displays, and transparent OLEDs.',
        icon: Cast,
    },
    {
        title: 'Media Player',
        description: 'High-performance media servers and compact players for stable content playback.',
        icon: Cpu,
    },
];

const itemsKo = [
    {
        title: 'LED Display',
        description: '대형 비디오 월을 위한 초고해상도 실내/실외 LED 캐비닛.',
        icon: Monitor,
    },
    {
        title: 'Professional TV',
        description: '초슬림 베젤 LCD 비디오 월 디스플레이 및 독립형 사이니지 유닛.',
        icon: Tv,
    },
    {
        title: 'Digital Signage',
        description: '키오스크, 스트레치 디스플레이, 투명 OLED 등 다양한 폼팩터.',
        icon: Cast,
    },
    {
        title: 'Media Player',
        description: '안정적인 콘텐츠 재생을 위한 고성능 미디어 서버 및 소형 플레이어.',
        icon: Cpu,
    },
];

const MediaHardware: React.FC = () => {
    const { language } = useLanguage();
    const items = language === 'ko' ? itemsKo : itemsEn;

    return (
        <section id="media-hw" className="pt-12 pb-48 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-sm md:text-base font-bold tracking-[0.3em] text-arc-accent uppercase mb-2">
                            Hardware Solution
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            MEDIA HARDWARE
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
                                ARC는 최고의 미디어 하드웨어를 보유하고 유통합니다.
                                <br className="hidden md:block" />
                                규모에 관계없이 프로젝트에 최적화된 장비를 제안해 드립니다.
                            </>
                        ) : (
                            <>
                                ARC owns and distributes top-tier media hardware.
                                <br className="hidden md:block" />
                                We propose the optimal equipment for your project, regardless of scale.
                            </>
                        )}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-arc-accent/50 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="mb-6 p-4 bg-black/50 rounded-xl w-fit group-hover:bg-arc-accent/20 transition-colors duration-300">
                                <item.icon className="w-8 h-8 text-gray-400 group-hover:text-arc-accent transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MediaHardware;
