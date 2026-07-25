import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '개인정보처리방침 | EverSpark',
  description: 'EverSpark의 개인정보 수집 및 이용, 보관 기간, 제3자 제공 등에 대한 정책을 안내합니다.',
  alternates: {
    canonical: 'https://www.everspark.co.kr/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=400,height=400,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png"
                alt="EverSpark Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-white">EverSpark</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-8">개인정보처리방침</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-300 leading-relaxed">
              EverSpark(이하 &quot;회사&quot;)는 다음의 목적을 위해 개인정보를 수집 및 이용합니다.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>상담 신청 및 서비스 문의에 대한 응대</li>
              <li>서비스 제공 및 계약 이행</li>
              <li>마케팅 및 광고에의 활용 (동의 시)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="text-gray-300 leading-relaxed">
              회사는 상담 신청 시 다음의 개인정보를 수집합니다.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>필수항목: 이름, 연락처(휴대폰 번호), 업종</li>
              <li>선택항목: 문의 내용</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-300 leading-relaxed">
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령의 규정에 의해 보존할 필요가 있는 경우 회사는 아래와 같이 관계 법령에서 정한 일정 기간 동안 개인정보를 보관합니다.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-300 leading-relaxed">
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. 개인정보의 파기</h2>
            <p className="text-gray-300 leading-relaxed">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. 이용자의 권리</h2>
            <p className="text-gray-300 leading-relaxed">
              이용자는 언제든지 본인의 개인정보를 조회하거나 수정할 수 있으며, 
              개인정보의 수집 및 이용에 대한 동의를 철회할 수 있습니다.
              개인정보 관련 문의는 아래 연락처로 해주시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. 개인정보 보호책임자</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>회사명: EverSpark</p>
              <p>이메일: everspark13@daum.net</p>
              <p>전화: 010-5925-8967</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. 광고 및 쿠키 정책</h2>
            <p className="text-gray-300 leading-relaxed">
              본 웹사이트는 Google AdSense 등 제3자 광고 서비스를 사용할 수 있습니다.
              이러한 서비스는 쿠키를 사용하여 이용자의 방문 기록을 기반으로 관련 광고를 표시합니다.
              이용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <p className="text-gray-400 text-sm">
              본 개인정보처리방침은 2026년 2월 28일부터 시행됩니다.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EverSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
