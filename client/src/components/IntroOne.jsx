import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/landing/introOne.scss';

function IntroOne() {
  const categoryContents = [
    {
      id: 1,
      title: '면역력 증진',
      desc: '건강한 면역 기능을 유지하기 위해서는 적절한 면역세포가 제 역할을 원할히 수행해야 합니다. 인삼/홍삼 등을 함유한 건강기능식품은 필요한 면역세포를 증가시키거나 그 기능을 조절하여 면역능력에 도움을 줄 수 있습니다.',
      src: '/images/tag_immunity.png',
    },
    {
      id: 2,
      title: '에너지 증진',
      desc: '우리 몸의 황산화의 유지(항상성)는 인체 내 자체 효소로 유지되는 효소적 체계와 비타민 C, 비타민 E, 코엔자임Q10등의 황산화물질 섭취에 따른 비효소적체계가 있습니다. 이러한 효소와 항산화물질은 활성산소를 불활성화 시키거나 중화하여 단백질의 산화를 방지하고, DNA 손상 및 지질과 산화를 억제하여 항산화를 유지시켜 줍니다. ',
      src: '/images/tag_energy.png',
    },
    {
      id: 3,
      title: '혈압 조절',
      desc: '신장은 레닌-안지오텐신계를 통해 나트륨의 함량을 조절하여 혈압을 일정하게 유지합니다. 이때 만들어지는 안지오텐신라는 물질은 혈관을 수축시키고, 신장에서 나트륨 재흡수를 통해 혈액량을 증가시켜 결국 혈압을 상승시키는역할을 합니다. 정어리펩타이드, 가쓰오보시올리고펩타이드등을 함유한 건강기능식품은 혈압을 상승시키는 호르몬의 작용을 어렵게 하여 높은 혈압을 낮추는데 도움을 줄 수 있습니다',
      src: '/images/tag_blood_pressure.png',
    },
    {
      id: 4,
      title: '눈 건강',
      desc: '루테인, 지아잔틴은 중심시력을 관장하는 눈의 황반색소 밀도를 높여주며 나이가 들어 시력이 흐려지는 노인성 황반변성을 예방 또는 개선시켜 주며 시력개선, 백내장 예방등에 도움을 줍니다.',
      src: '/images/tag_eye.png',
    },
    {
      id: 5,
      title: '관절, 뼈 건강',
      desc: '대두이소플라본을 원료로 하는 원료로 하는 건강기능식품은 골 흡수 및 골 형성의 균형을 통해 뼈 기능을 개선시킬 수 있습니다. 한편 초록입홍합추출오일복합물, 지방산복합물등을 원료로 하는 건강기능식품은 관절에서 염증을 유발하는 원료의 생성억제로 통증감소 및 관절기능을 개선시키는데 도움을 줄 수 있습니다',
      src: '/images/tag_bones.png',
    },
    {
      id: 6,
      title: '간 건강',
      desc: '우리의 간은 바람직하지 않은 식생활, 지나친 음주 및 비만 등의 요인으로 그 기능이 저하될 수 있습니다. 따라서 간 기능을 개선하기 위해서는 바람직한 식생활을 통해 모든 음식을 골고루 섭취하는 것이 중요하며, 간에 유익한 술은 없으므로 절제하는 음주습관이 필요합니다. 무리한 운동으로 인한 급격한 체중감소는 오히려 심각한 지방간 및 지방간염 뿐 아니라 간 손상을 일으킬 수 있으므로 피해야합니다',
      src: '/images/tag_liver.png',
    },
  ];

  return (
    <div className="introOne">
      <div className="introOne_text">
        <h1>관심사별로 건강기능식품을 찾아보세요!</h1>
        <p>
          아래의 슬라이드를 이용하면 여러가지 관심사별로 제품들을 제공해드려요
        </p>
      </div>
      <div className="slider">
        <Carousel
          showArrows
          showThumbs={false}
          showIndicators
          showStatus={false}
          infiniteLoop
          autoPlay
          transitionTime="600"
        >
          {categoryContents.map((el) => (
            <div className="scene" key={el.id}>
              <div className="textBox">
                <h3>{el.title}</h3>
                <p>{el.desc}</p>
                <button type="button" className="goToSearch">
                  상품 둘러보기
                </button>
              </div>
              <div className="imageBox">
                <img alt="immunity" src={el.src} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default IntroOne;
