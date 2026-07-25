import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import NaverLandingContent from '@/components/naver-landing-content';

const siteUrl = 'https://www.everspark.co.kr';

export const metadata: Metadata = {
  ...siteMetadata['/'],
  alternates: {
    canonical: `${siteUrl}/`,
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'EverSpark',
        url: `${siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: 'https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=200,height=200,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png',
        },
        description: '네이버 마케팅 전문 코칭 & 대행 서비스. 네이버 블로그와 플레이스 최적화로 로컬 비즈니스의 온라인 노출을 극대화합니다.',
        sameAs: [
          'http://pf.kakao.com/_xmLUxgn',
        ],
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        serviceType: '네이버 마케팅 코칭 & 대행',
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: '대한민국',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '네이버 마케팅 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '네이버 코칭 플랜',
                description: '직접 마케팅을 배우고 실행하는 실전형 코칭 서비스',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '네이버 완전 대행',
                description: '네이버 플레이스 & 블로그 완전 대행 서비스',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: '네이버 마케팅 전문 코칭 & 대행 | EverSpark',
        description: '네이버 검색 노출의 90%를 차지하는 블로그와 플레이스 마케팅 전문. 코칭형과 맞춤 견적 대행형으로 중소사업자의 온라인 성장을 돕습니다.',
        inLanguage: 'ko-KR',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'EverSpark',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'ko-KR',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NaverLandingContent />
    </>
  );
}
