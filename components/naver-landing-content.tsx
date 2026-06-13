"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  TrendingUp, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  Users,
  FileText,
  BarChart3,
  Clock,
  Target,
  Sparkles,
  Shield,
  ChevronDown,
  RefreshCw
} from "lucide-react";

export default function NaverLandingContent() {
  const openKakaoChat = () => {
    window.open('https://pf.kakao.com/_xmlUxgn/chat', '_blank');
  };

  const openModal = (_serviceType: "coaching" | "agency") => {
    openKakaoChat();
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Fixed Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=400,height=400,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png"
                alt="EverSpark Logo"
                width={36}
                height={36}
              />
              <span className="text-lg font-bold text-white">EverSpark</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={scrollToServices}
                className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium"
              >
                서비스 소개
              </button>
              <Link 
                href="/insights" 
                className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium"
              >
                트렌드 인사이트
              </Link>
              <Button 
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => openModal("coaching")}
              >
                무료 상담
              </Button>
            </nav>
            <div className="md:hidden flex items-center gap-2">
              <Link 
                href="/insights" 
                className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium px-2"
              >
                인사이트
              </Link>
              <Button 
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => openModal("coaching")}
              >
                상담
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-32 pb-24 md:pt-44 md:pb-36" style={{
        background: 'linear-gradient(135deg, #1a1a4e 0%, #2d1b4e 25%, #4a1942 50%, #6b1d5c 75%, #1a1a4e 100%)'
      }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"></div>
          
          {/* Tech circuit lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.5"/>
              </linearGradient>
            </defs>
            {/* Horizontal lines */}
            <line x1="0" y1="20%" x2="30%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1"/>
            <line x1="70%" y1="80%" x2="100%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1"/>
            {/* Diagonal lines */}
            <line x1="80%" y1="0" x2="100%" y2="40%" stroke="url(#lineGrad)" strokeWidth="1"/>
            <line x1="0" y1="60%" x2="20%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1"/>
            {/* Circuit dots */}
            <circle cx="30%" cy="20%" r="3" fill="#60a5fa" opacity="0.6"/>
            <circle cx="70%" cy="80%" r="3" fill="#c084fc" opacity="0.6"/>
            <circle cx="85%" cy="15%" r="2" fill="#60a5fa" opacity="0.4"/>
            <circle cx="15%" cy="85%" r="2" fill="#c084fc" opacity="0.4"/>
          </svg>
          
          {/* Light streaks */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-2/3 h-px bg-gradient-to-r from-pink-500/40 via-purple-500/20 to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-1/2 h-px bg-gradient-to-l from-blue-400/40 via-cyan-400/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            {/* Logo - Larger size */}
            <div className="flex justify-center mb-6">
              <Image 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=400,height=400,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png"
                alt="EverSpark Logo"
                width={180}
                height={180}
                className="drop-shadow-[0_0_30px_rgba(251,146,60,0.4)]"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              네이버에서 안 보이면,<br />
              존재하지 않는 것과 같습니다
            </h1>
            <p className="text-lg md:text-xl text-orange-300 font-semibold max-w-2xl mx-auto">
              노출 → 클릭 → 문의, 이 흐름을 만들고 지속 개선합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 font-bold shadow-xl rounded-full"
                onClick={() => openModal("coaching")}
              >
                <Search className="mr-2 h-5 w-5" />
                네이버 현황 무료 점검 받기
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white/70 text-white hover:bg-white/10 text-lg px-8 py-6 font-bold rounded-full"
                onClick={scrollToServices}
              >
                <Target className="mr-2 h-5 w-5" />
                코칭 플랜 자세히 보기
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              내 가게는 괜찮은데,<br />온라인에서 안 보이는 문제
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              실제로 많은 사장님들이 겪고 계신 현실적인 고민들입니다.<br />
              혹시 이런 상황, 익숙하지 않으신가요?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "지역+업종 검색에 우리 가게가 안 뜬다",
              "블로그 글이 검색 결과에 노출이 안 된다",
              "광고비는 쓰는데 어디에 집중해야 할지 모르겠다",
              "단골은 있는데 신규 고객 유입이 적다",
              "스마트플레이스 등록 후 다음 단계를 모르겠다",
              "경쟁 업체는 상위 노출되는데 우리는 안 보인다"
            ].map((problem, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500 bg-gray-900/50 backdrop-blur border-gray-800 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all">
                <CardContent className="flex items-start gap-3 p-6">
                  <CheckCircle2 className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-200">{problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              블로그와 플레이스,<br />왜 같이 해야 할까요?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              네이버 마케팅의 핵심은 블로그와 플레이스의 쌍두마차 전략입니다.<br />
              블로그는 신뢰와 스토리를 쌓고, 플레이스는 방문 직전 고객이 들르는 마지막 관문입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Blog Card */}
            <Card className="border-2 border-orange-500/30 bg-gray-900/60 backdrop-blur shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all hover:scale-[1.02]">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-full ring-2 ring-orange-500/50">
                    <FileText className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">네이버 블로그</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  신뢰와 전문성을 보여주는 콘텐츠 허브
                </p>
                <ul className="space-y-3">
                  {[
                    "로직에 맞는 전략적 글쓰기",
                    "전환율 높은 콘텐츠 구조 설계",
                    "저품질 블로그를 피하는 핵심 전략",
                    "이웃 관리로 단골 독자 확보",
                    "검색 상위 노출을 위한 키워드 최적화"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Place Card */}
            <Card className="border-2 border-blue-500/30 bg-gray-900/60 backdrop-blur shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all hover:scale-[1.02]">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-full ring-2 ring-blue-500/50">
                    <MapPin className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">네이버 플레이스</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  고객이 방문하기 직전 반드시 확인하는 관문
                </p>
                <ul className="space-y-3">
                  {[
                    "대표 키워드 세팅의 중요성",
                    "카테고리·소개글·사진 최적화",
                    "지역 검색 상위 노출 전략",
                    "리뷰 관리로 신뢰도 향상",
                    "주소·전화번호 확인 → 방문으로 바로 전환"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-orange-500/10 rounded-xl border border-orange-500/30 backdrop-blur">
            <p className="text-center text-xl text-gray-100 font-medium">
              💡 플레이스 클릭 = <strong className="text-orange-400">방문 직전 고객</strong>입니다
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              그래서, 무엇이 달라지나요?
            </h2>
            <p className="text-gray-400 text-sm">
              *결과를 보장하지 않습니다. 다만, 매달 데이터를 보며 함께 개선합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 1: 검색에서 발견 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">검색에서 발견</h3>
              <p className="text-gray-400">고객이 검색할 때, 우리 가게가 보입니다</p>
            </div>

            {/* Card 2: 플레이스에서 행동 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">플레이스에서 행동</h3>
              <p className="text-gray-400">전화, 길찾기, 예약 — 바로 행동으로 연결됩니다</p>
            </div>

            {/* Card 3: 블로그에서 신뢰 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">블로그에서 신뢰</h3>
              <p className="text-gray-400">전문성과 진정성이 담긴 콘텐츠로 신뢰를 쌓습니다</p>
            </div>

            {/* Card 4: 매달 개선 루프 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">매달 개선 루프</h3>
              <p className="text-gray-400">데이터 기반으로 매달 전략을 점검하고 개선합니다</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-300">
              이 흐름을 만들기 위해, <span className="text-orange-400 font-semibold">두 가지 방식</span>을 준비했습니다 ↓
            </p>
          </div>
        </div>
      </section>

      {/* Service Introduction Section */}
      <section id="services" className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #16213e 0%, #0f0f23 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              두 가지 방식으로 함께합니다
            </h2>
            <p className="text-xl text-gray-300">
              사장님의 상황에 맞는 플랜을 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coaching Plan */}
            <Card className="border-2 border-orange-500 bg-gray-900/80 backdrop-blur shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">월 30만원 코칭형</h3>
                <p className="text-orange-50">직접 배우고 싶은 실전형 사장님을 위한</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">대상</h4>
                      <p className="text-gray-300">직접 마케팅을 배우고, 스스로 운전대를 잡고 싶은 분</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-orange-500" />
                      포함 내용
                    </h4>
                    <ul className="space-y-2 ml-7">
                      {[
                        "키워드 세팅 및 정기 점검 (플레이스 + 블로그)",
                        "주간 콘텐츠 주제 및 제목 제안",
                        "작성된 글 피드백 (저품질 위험, 전환 요소 보완)",
                        "플레이스 세팅 (기본정보, 카테고리, 소개글, 대표 키워드)",
                        "실시간 질문 및 1:1 코칭 세션"
                      ].map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <p className="text-center text-gray-400 italic">
                    "대행에만 맡기기 싫은, 실전형 사장님을 위한 플랜입니다"
                  </p>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-6 font-bold rounded-full"
                  onClick={() => openModal("coaching")}
                >
                  코칭 플랜 신청하기
                </Button>
              </CardContent>
            </Card>

            {/* Full Service Plan */}
            <Card className="border-2 border-blue-500 bg-gray-900/80 backdrop-blur shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">완전 대행형</h3>
                <p className="text-blue-50">전문가에게 맡기고 싶은 분을 위한</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">대상</h4>
                      <p className="text-gray-300">시간이 없고, 네이버를 전문가에게 전적으로 맡기고 싶은 분</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <p className="text-amber-400 font-semibold">
                      💰 맞춤 견적형
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      업종, 지역, 작업 범위에 따라 비용이 달라지는 맞춤 견적형 플랜입니다
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      포함 가능 업무
                    </h4>
                    <ul className="space-y-2 ml-7">
                      {[
                        "네이버 플레이스 초기 세팅 및 리뉴얼",
                        "블로그 포스팅 대행 (협의 후 결정)",
                        "키워드 리서치 및 최적화",
                        "리뷰·평판 관리 전략 수립",
                        "월간 리포트 및 성과 분석"
                      ].map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    이런 분께 추천
                  </h4>
                  <ul className="space-y-1.5 ml-7 text-sm">
                    {[
                      "글 쓸 시간이 정말 없는 분",
                      "마케팅보다 본업에 집중하고 싶은 분",
                      "전문가 손에 맡기고 결과만 보고 싶은 분",
                      "빠른 시작이 필요한 신규 오픈 매장"
                    ].map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <p className="text-center text-gray-400 italic">
                    "상담 폼을 통해 상황을 남겨주시면, 맞춤 제안을 드립니다"
                  </p>
                </div>

                <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg py-6 font-bold rounded-full"
                  onClick={() => openModal("agency")}
                >
                  대행 상담 신청하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              네이버만 파온 마케터의<br />실전형 파트너십
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              EverSpark는 네이버 플레이스와 블로그를 중심으로<br />
              중소상공인, 병의원, 자영업자 마케팅을 해온 네이버 전문 마케팅 회사입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "다양한 업종 경험",
                description: "병의원, 한의원, 카페, 식당, 미용실, 학원 등 로컬 비즈니스 마케팅 전문",
                example: "예: 정형외과, 동네 카페, 네일샵, 영어학원 등"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "쌍두마차 전략",
                description: "플레이스 상위 노출과 블로그 상위 노출을 동시에 설계하는 통합 전략"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "데이터 기반 피드백",
                description: "실제 운영 데이터와 검색 트렌드를 기반으로 현실적인 코칭 제공"
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "실전형 커뮤니케이션",
                description: "이론이 아닌 실전, 사장님 입장에서 바로 쓸 수 있는 전략 중심"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center bg-gray-900/60 backdrop-blur border border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-block p-4 bg-orange-500/20 rounded-full text-orange-400 ring-2 ring-orange-500/50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                  {item.example && (
                    <p className="text-sm text-gray-500 italic">{item.example}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              이렇게 함께 진행합니다
            </h2>
            <p className="text-xl text-gray-300">
              복잡하지 않습니다. 명확한 5단계 프로세스로 진행됩니다.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                step: "1단계",
                title: "네이버 현황 진단",
                description: "플레이스, 블로그, 키워드, 리뷰 상태를 점검해요",
                icon: <Search className="h-6 w-6" />
              },
              {
                step: "2단계",
                title: "목표 설정",
                description: "매출, 방문, 문의 중 우선순위를 정해요",
                icon: <Target className="h-6 w-6" />
              },
              {
                step: "3단계",
                title: "전략 설계",
                description: "블로그와 플레이스 실행 플랜을 수립해요",
                icon: <FileText className="h-6 w-6" />
              },
              {
                step: "4단계",
                title: "실행 & 피드백",
                description: "코칭형은 직접 실행 후 피드백, 대행형은 전담 실행해요",
                icon: <Clock className="h-6 w-6" />
              },
              {
                step: "5단계",
                title: "리포트 & 다음 단계",
                description: "결과 확인 후 다음 달 계획을 세워요",
                icon: <BarChart3 className="h-6 w-6" />
              }
            ].map((process, index) => (
              <Card key={index} className="bg-gray-900/60 backdrop-blur border border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-[1.02]">
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-orange-500/30">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-orange-400">{process.icon}</div>
                      <h3 className="text-xl font-bold text-white">{process.title}</h3>
                      <span className="text-sm text-orange-400 font-semibold">{process.step}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{process.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & CTA Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(135deg, #1a1a4e 0%, #2d1b4e 50%, #1a1a4e 100%)'
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              가격과 신청 방법
            </h2>
            <p className="text-xl text-gray-300">
              지금 바로 시작하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Coaching Plan */}
            <Card className="bg-gray-900/90 backdrop-blur border-2 border-orange-500/50 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <div className="text-center pb-4 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-orange-400">코칭 플랜</h3>
                  <div className="text-3xl font-extrabold text-white mt-1">월 30만원</div>
                </div>
                
                <p className="text-gray-300 text-center text-sm">
                  키워드 세팅 · 콘텐츠 제안 · 글 피드백 · 플레이스 최적화
                </p>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 font-bold rounded-full"
                  onClick={() => openModal("coaching")}
                >
                  코칭 신청하기
                </Button>
              </CardContent>
            </Card>

            {/* Agency Plan */}
            <Card className="bg-gray-900/90 backdrop-blur border-2 border-blue-500/50 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <div className="text-center pb-4 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-blue-400">완전 대행</h3>
                  <div className="text-3xl font-extrabold text-white mt-1">맞춤 견적</div>
                </div>
                
                <p className="text-gray-300 text-center text-sm">
                  플레이스 세팅 · 블로그 대행 · 키워드 최적화 · 평판 관리
                </p>

                <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-5 font-bold rounded-full"
                  onClick={() => openModal("agency")}
                >
                  대행 상담 신청하기
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              💳 결제는 상담 후 카카오페이, 계좌이체, 카드결제 등 편한 방식으로 진행 가능합니다
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative" style={{
        background: 'linear-gradient(180deg, #16213e 0%, #0f0f23 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              자주 받는 질문들
            </h2>
            <p className="text-xl text-gray-300">
              궁금하신 점이 있으신가요?
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "코칭을 받아도, 제가 직접 글을 써야 하나요?",
                a: "네, 코칭형 플랜에서는 사장님이 직접 글을 작성하시고, 저는 주제 제안, 제목 피드백, 저품질 위험 체크 등을 담당합니다. 직접 쓰는 것이 부담스럽다면 완전 대행 플랜을 추천드립니다."
              },
              {
                q: "이미 네이버 블로그가 저품질인 것 같은데, 회복이 가능할까요?",
                a: "가능합니다. 저품질 회복은 시간이 걸리지만, 올바른 콘텐츠 전략과 꾸준한 포스팅으로 충분히 개선할 수 있습니다. 현황 진단을 통해 구체적인 회복 플랜을 제시해 드립니다."
              },
              {
                q: "병원/의원/한의원 같은 의료 업종도 가능한가요?",
                a: "물론입니다. 오히려 의료 업종은 네이버 플레이스와 블로그가 매우 중요합니다. 의료법 규제를 준수하면서도 효과적으로 노출할 수 있는 전략을 함께 설계합니다."
              },
              {
                q: "최소 진행 기간이 있나요?",
                a: "코칭 플랜은 월 단위 계약이며, 최소 3개월 진행을 권장합니다. 네이버 마케팅은 즉각적인 효과보다는 꾸준한 누적이 중요하기 때문입니다. 대행 플랜은 프로젝트 성격에 따라 협의합니다."
              },
              {
                q: "완전 대행을 맡겼을 때, 결과를 보장해 주나요?",
                a: "정직하게 말씀드리면, 마케팅은 100% 보장이 없습니다. 다만 네이버 로직에 맞는 최적의 전략을 실행하고, 데이터 기반으로 지속 개선하는 것을 약속드립니다. 투명한 리포트로 모든 과정을 공유합니다."
              },
              {
                q: "다른 지역에 있어도 진행 가능한가요?",
                a: "네, 모든 진행은 온라인(화상 미팅, 카톡, 이메일 등)으로 가능합니다. 전국 어디서든 동일한 퀄리티로 서비스를 제공합니다."
              },
              {
                q: "무료 현황 점검에서는 무엇을 받나요?",
                a: "• 블로그 저품질 여부 및 노출 상태 진단 • 플레이스 순위 및 리뷰 현황 분석 • 경쟁 업체 대비 포지션 파악 • 맞춤 개선 방향 제안서 제공"
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-900/60 backdrop-blur border border-gray-800 shadow-lg hover:shadow-orange-500/10 transition-all">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-start gap-2">
                    <span className="text-orange-400 flex-shrink-0">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed ml-6">
                    <span className="text-orange-400 font-bold">A.</span> {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #d97706 0%, #ea580c 50%, #dc2626 100%)'
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            네이버에서 찾아지는 사업,<br />
            지금 시작하세요
          </h2>
          <p className="text-xl text-white/90 mb-4 leading-relaxed drop-shadow">
            더 늦기 전에, 네이버 마케팅의 기회를 잡으세요.<br />
            무료 현황 점검부터 시작해 보세요.
          </p>
          <p className="text-lg text-yellow-200 mb-10 font-medium drop-shadow">
            ✨ 노출 → 클릭 → 전환, 이 흐름을 만들어 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-700 hover:bg-gray-100 text-lg px-8 py-6 font-bold shadow-2xl rounded-full"
              onClick={() => openModal("coaching")}
            >
              <Search className="mr-2 h-5 w-5" />
              무료 현황 점검 신청
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 font-bold rounded-full"
              onClick={() => openKakaoChat()}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              카카오톡 상담하기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Image 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=400,height=400,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png"
                alt="EverSpark Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold text-white">EverSpark</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/insights" className="text-gray-400 hover:text-orange-400 transition-colors">
                트렌드 인사이트
              </Link>
              <button onClick={openKakaoChat} className="text-gray-400 hover:text-orange-400 transition-colors">
                카카오톡 상담
              </button>
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                개인정보처리방침
              </Link>
            </nav>
          </div>
          <div className="text-center border-t border-gray-800 pt-8">
            <p className="text-sm">
              © {new Date().getFullYear()} EverSpark. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              사업자등록번호: 140-25-01881 | 회사명: EverSpark | 이메일: everspark13@daum.net | 전화: 010-5925-8967
            </p>
            <p className="text-xs mt-1">
              주소: 경기도 용인시 기흥구 동백중앙로 191, 8층 C8821호
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
