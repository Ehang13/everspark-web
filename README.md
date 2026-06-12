# EverSpark - 네이버 마케팅 전문 랜딩 페이지

대한민국 중소기업 및 자영업자를 위한 네이버 마케팅 전문 코칭 & 대행 서비스 랜딩 페이지입니다.

## 프로젝트 개요

네이버 블로그와 플레이스(지도)를 활용한 마케팅 서비스를 소개하는 원페이지 랜딩 페이지입니다. 로컬 비즈니스 사장님들이 네이버 검색 노출의 중요성을 인식하고, 코칭 또는 대행 서비스를 신청하도록 유도합니다.

## 주요 기능

### 랜딩 페이지 (9개 섹션)
1. **Hero 섹션** - EverSpark 로고와 강력한 메인 메시지, CTA
2. **문제 인식 섹션** - 타겟 고객의 공감 포인트
3. **솔루션 섹션** - 블로그 & 플레이스 쌍두마차 전략
4. **서비스 소개** - 월 30만원 코칭형 + 완전 대행형
5. **Why Me 섹션** - 전문성과 신뢰 구축
6. **진행 프로세스** - 5단계 명확한 흐름
7. **가격 & 결제** - 명확한 가격 제시와 CTA
8. **FAQ** - 자주 묻는 질문 6개
9. **최종 CTA** - 행동 유도

### 트렌드 인사이트 (/insights)
- **구글 검색 최적화**: SSR로 검색 엔진에서 잘 노출됨
- **관리자 전용 글쓰기**: 관리자만 인사이트 작성/수정/삭제 가능
- **이미지 업로드**: 대표 이미지(썸네일) 업로드 지원
- **자동 슬러그 생성**: 제목 입력 시 URL 슬러그 자동 생성
- **공개/비공개 설정**: 작성 중인 글은 비공개로 저장 가능
- **애드센스 광고 영역**: 글 상단/하단에 광고 배치 영역 준비됨
- **인사이트 목록 페이지**: `/insights`
- **인사이트 상세 페이지**: `/insights/[slug]`

### 디자인 특징
- **고정 상단 네비게이션**: 모든 페이지에서 일관된 네비게이션 제공
- **EverSpark 브랜드 아이덴티티**: 오렌지(열정/성장)와 블루(신뢰/전문성) 컬러 시스템
- **깔끔하고 전문적인 비즈니스 랜딩 페이지 스타일**
- **모바일 완전 반응형 레이아웃**
- **섹션별 명확한 구분** (배경색 교차)
- **충분한 여백과 가독성 높은 타이포그래피**

### SEO 최적화 완료
- ✅ **sitemap.xml**: 검색엔진 크롤링 최적화
- ✅ **robots.txt**: 검색봇 접근 제어 (관리자 페이지 제외)
- ✅ **JSON-LD 구조화 데이터**: Organization, Service, WebPage schema
- ✅ **메타데이터 강화**: 키워드 최적화, OpenGraph, Twitter Card
- ✅ **브랜드 OG 이미지**: EverSpark 브랜드 컬러 반영

### 애드센스 연동 준비
- ✅ **ads.txt**: Google AdSense 인증 파일 (승인 후 게시자 ID 설정 필요)
- ✅ **광고 영역**: 인사이트 상세 페이지에 상단/하단 광고 배치 영역
- ✅ **개인정보처리방침**: 애드센스 승인 필수 요건 충족

### 타겟 고객
- 병의원, 한의원
- 카페, 식당
- 미용실, 네일샵
- 학원, 교습소
- 기타 로컬 비즈니스 사장님

## 기술 스택

- **Framework:** Next.js 14 (App Router)
- **Database:** Convex
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Language:** TypeScript

## 페이지 구조

```
/app
  ├── page.tsx              # 메인 랜딩 페이지
  ├── layout.tsx            # 루트 레이아웃
  ├── metadata.json         # 페이지별 SEO 메타데이터
  ├── sitemap.ts            # 동적 사이트맵 생성
  ├── robots.ts             # robots.txt 설정
  ├── globals.css           # 글로벌 스타일
  ├── admin/page.tsx        # 관리자 대시보드
  ├── privacy/page.tsx      # 개인정보처리방침
  └── insights/
      ├── page.tsx          # 트렌드 인사이트 목록 페이지
      └── [slug]/page.tsx   # 트렌드 인사이트 상세 페이지
  
/components
  ├── naver-landing-content.tsx     # 메인 랜딩 페이지 (고정 헤더 포함)
  ├── insights-page-content.tsx     # 인사이트 목록 클라이언트 컴포넌트
  ├── insights-article-content.tsx  # 인사이트 상세 클라이언트 컴포넌트
  └── admin-page-content.tsx        # 관리자 대시보드 (상담+인사이트 관리)

/convex
  ├── schema.ts             # DB 스키마 (users, contacts, articles)
  ├── articles.ts           # 인사이트 CRUD API + 이미지 업로드
  ├── contacts.ts           # 상담 신청 API
  └── authz.ts              # 권한 체크 API

/public
  └── ads.txt               # Google AdSense 인증 파일
```

## 관리자 페이지

### 보안 기능
- **OTP 이메일 인증**: Convex Auth를 사용한 이메일 기반 일회용 비밀번호 인증
- **역할 기반 접근 제어**: 관리자 권한(`role: "admin"`)이 있는 사용자만 접근 가능
- **Gate & Return Union 패턴**: 보안 데이터 접근을 위한 안전한 패턴 적용

### 접근 방법
1. 브라우저에서 `/admin` URL 직접 입력
2. 관리자 이메일 입력
3. 이메일로 받은 인증 코드 입력
4. 인증 성공 후 상담 신청 목록 및 인사이트 관리

### 관리자 계정 설정
Convex 대시보드에서 사용자의 `role` 필드를 `"admin"`으로 설정해야 합니다:
1. Convex 대시보드 접속
2. `users` 테이블 선택
3. 관리자로 지정할 사용자 찾기
4. `role` 필드를 `"admin"`으로 설정

### 구현된 기능
- ✅ 상담 신청 폼 (Convex DB 활용)
- ✅ 이메일 알림 시스템 (텔레그램 연동)
- ✅ 관리자 인증 시스템 (OTP)
- ✅ 역할 기반 접근 제어
- ✅ 트렌드 인사이트 관리 (CRUD + 이미지 업로드)

## 애드센스 설정 방법

1. **Google AdSense 계정 생성**: https://www.google.com/adsense
2. **사이트 등록**: everspark.co.kr 도메인 등록
3. **ads.txt 수정**: `/public/ads.txt` 파일에서 게시자 ID 설정
   ```
   google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. **승인 대기**: 1-2주 소요
5. **광고 코드 삽입**: 승인 후 실제 광고 코드를 인사이트 페이지에 삽입

## 향후 개선 사항

- 실제 결제 시스템 연동 (토스페이먼츠 등)
- 관리자 페이지에서 상담 상태 변경 기능
- 인사이트 카테고리 기능 (필요시)
