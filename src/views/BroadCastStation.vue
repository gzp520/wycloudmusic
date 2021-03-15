<template>
  <div class="BroadCastStation">
    <template v-if="banners && shear_recommend && optimiz && shear_hours && shear_hot && classify">
      <div class="swiper-container main-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banners" :key="item.bannerId">
            <img :src="item.pic" alt="" />
            <span>{{ item.typeTitle }}</span>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination main-swiper-pagination"></div>
      </div>
      <div class="recommend">
        <ModuleTitle>
          <template #main>
            <span>推荐电台</span>
          </template>
          <template #sub>
            <span @click="switchNew">换一批</span>
          </template>
        </ModuleTitle>
        <ul class="broadCastList">
          <broadCastITem v-for="item in shear_recommend" :key="item.id" :item="item"></broadCastITem>
        </ul>
      </div>
      <div class="optimiz recommend">
        <ModuleTitle>
          <template #main>
            <span>今日优选</span>
          </template>
          <template #sub>
            <span @click="play">开始收听</span>
          </template>
        </ModuleTitle>
        <ul class="broadCastList">
          <broadCastITem v-for="item in optimiz" :key="item.id" :item="item"></broadCastITem>
        </ul>
      </div>
      <div class="hours recommend">
        <ModuleTitle>
          <template #main>
            <span>24小时节目榜</span>
          </template>
          <template #sub>
            <span @click="ToMore('24小时节目榜',hours)">查看更多</span>
          </template>
        </ModuleTitle>
        <ul class="broadCastList">
          <broadCastITem v-for="item in shear_hours" :key="item.id" :item="item"></broadCastITem>
        </ul>
      </div>
      <div class="hot recommend">
        <ModuleTitle>
          <template #main>
            <span>热门电台榜</span>
          </template>
          <template #sub>
            <span @click="ToMore('热门电台榜',hot)">查看更多</span>
          </template>
        </ModuleTitle>
        <ul class="broadCastList">
          <broadCastITem v-for="item in shear_hot" :key="item.id" :item="item"></broadCastITem>
        </ul>
      </div>
      <div class="classify">
        <ModuleTitle>
          <template #main>
            <span>热门分类</span>
          </template>
          <template #sub>
            <span @click="ToMores('热门分类','')">更多</span>
          </template>
        </ModuleTitle>
        <ul>
          <li v-for="(item,index) in classify" :key="item.categoryId" @click="ToMores('热门分类',index)">
            <img :src="iconStr[index]" alt="">
            <span>{{item.categoryName}}</span>
          </li>
        </ul>
      </div>
      <footer>
        —— 我也是有底线的 ——
      </footer>
    </template>
    <template v-else>
      <div class="load">
        <div>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <p>加载中...</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.min.css";
import broadCastITem from '../components/broadCastITem'
import ModuleTitle from '../components/ModuleTitle'
export default {
  components:{
    broadCastITem,
    ModuleTitle
  },
  data(){
    return {
      banners: null,
      recommend:null,
      shear_recommend:[],
      length_commend:0,
      optimiz:null,
      hours:null,
      shear_hours:null,
      hot:null,
      shear_hot:null,
      classify:null,
      iconStr:[
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEUklEQVRYR+2Wa2gcVRTH/2eySWqNpNovpVSN1VbYnU18RLMzCWVnJgUfxBC1gqBQarGIWPFBqEXQIqi1BKOgiKKCRT+0gjaKsSQ7u7hp7kaN0sykVRRTlVq1UqyoyWYzc2TSSdhsZpPdVOiX3k935v7POb97zn0RznGjcxwf5wEWzIBlNG0klq5m0HoCXwXCz2BYTO630cRQX375LE3dDuI7iGkdEWdd4AQBx1GJbfJBcapYqYsC2EasE0y7fcMcARaAVQys9v4x4a1oQtxn6UoHGF1EuMLXZoHp0lZNfxMmCeiKJMTOIIhAAFtXxgDUMbA/BHSHqlcMr+vt9RzDNprCzLSFQI8B+BfA8jM8SE+BdjWYg6anO2rcuNLh0PMAb/UDD8mmiBVCzAOwNKWPCK0A75bNzI5iqTuiNd/ikPseAbUSoSOcEB8Gab9su375sn+qfgNQw4zOaFLsydfNARjRY5sl0NsEJCKmaF1si1q6ohLwEYBLpAp3fbhv6LtiNrau5ABMTEiTaxr7h0/P6OYA2LoywEBt1p3UGlPDfywG4I2P6somBvZNayXpcrn/0E9BdocNdXsF80sA98hmpj0YQFNOgfCubIqHSgk+oxnVlC1MeBPA70xufTQx5KV8XhvVlQkwfokkxdp5AF/HY3WVEo2xi63RlPCcldUsQ3mYGN0MWFNu9YZrU6k/Cx3YunIcwErZFMvmAVjxWJwkSrLLWjSVSZUV3RfbuvokwM8QqO/0OLerQozn+7E1JQlCXDbFbOlnO3Zr82Vw3R/B9KCcHHx1KQCejaWr9xL4HSIc2JcQt+8C3NlS6epJgGsiprig2CL8HuAvZDNz91IB5i5M6mHXfdHLqL1RvQYOfwVgTDbFlYEAlh57mkBPuYSO+iL7ulQwf3e84B1oYKRAqPP7r8tJsS0QwKe3mZDLOdVa0EIqFcDT2fF4DUvZPRKwmcFVgHRMNgdnZ+9p5p2Etha7DUQHAHTLpniknIDFtLau9AMwHMLNDQnxab4u8C6w9NheAt1DwF0RU+w/G4hRQ3mWGU8QY2ckKZ4r9BUIcCSuyg5xj3fDnQ2Ebah3gtmbwPuyKTYFTaTodeyfCx8DuBDMLXIyc6icTBw2lJsqGL3MsFmqaK9PDPxQFsD0nvYPJ68vVYZWhw+mT5QCYWuxZhANEDA6NeW0NXz2uXe9B7ZF34T5EHCrL5JTqb8XgjhqqIrDPAjg18lcqP66dPrkQvpFATzjEUNVpDNOwUBz1BTT/cJmG7FHwdQFIPfXOGoLj+KyS5BvYG244VKEQoMErCHwAxEz81r+uK2rb/ivn2OyKWaeZ4tWrKQMzHgZaWm5mCqdvUS4Fd5DhNwdFZDWOoz7AbQx+JOomfHGSm5lAXhe7XC4CqtWvJL31vN+Z0F4WU6IzpIj+8KyAWYCfGM01TssPc5MmYmp7AeN6eGSdkgh4JIByp3pkrfh/xXoPECxDPwHAxqlMHKxPBwAAAAASUVORK5CYII=',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD8ElEQVRYR82XX4hUdRTHv+fOrhsJSVmBiGkPZs78ZhNs897ZVnZ+s2ZGLPRiRUS5PqQgQiLSQ5A9hIREhlERmeJDmFFRUSF5f7OCzG92TWudOyNIxT5UD0l/HgQfdvd34m4zs9fZe++MzCx2n4a553fO55x7vufcS7jJF93k+IgE8DY7d5gpHiZgVTuQDExa3fSlOKX/CvMTDZB18iAMthO8fpZwSrj60ZYBvGz/MMh8AeBbBo+3CdFHoMcsMo8k3bHvGn2FVsDL2vtA9DqAQ0LpF9sBKEvnIAN7wbxH5ItvtgRQyjlHiDFC4J0pVXyvHYBS1hkhwhEGH02r4khLAJ50zgLoJ1AupQqqHYDKUL9tjNEAzgmlH2oJoCwzVxh8ezewco3Sv0UBlDb2rUBXYntocxGfFO5Y5fuh9UtuMYt+BZBYcg1LV2h9LWg/rwcqmzasNjPWZYAmhCqsi8u+NGg/SRadaHBYZjJb/eC1/z3puACkIcr0ugW/GgGBNESYUwCfEKr4dByAJ51DDP4bmJsnVM08eK6cs99ipt1gvCDy+v0mAP8pgECvplRhfxOAcQYOpJX+PLZS0t5BoHcZdDitCrtjAWoKMIxnevP6oyYAUwy6P60KP8fZVWRmowGfASgvVEHGV6CqAMPmwd782Pkoxz8M2qu6LPo0rfT6Ziq5MDBw16Lu6T8AXBFK3x0LUFXAbTA9S8Xo6NUo5xel/TwRDaRdHaqCxnOedHwlLJ+mmTXr3PHLtfvXqaAiMysNeJKBC42ZXco9fJ/BdB8M9czATFiU2AXweaH0280q4N/3pPMZgCcI2JpS+pNQgIvS3mKBvgHhuHD1czUjP1sLdLQh0CQs86w4PeYPraaXJ52XABwg0GspVXg5FMDLZfaA+Q1m7Evn9cGAjjkkwi8wPQ/EPabgmUrOHjJM/jL6Sig9HApQyjofEGG7xfR4Ml/4Oq4CFvFTSbf4cdPUqwY/Smd5F+D3waRQ+t7wClQVAIPVYlT/FHRe7wEAFrrOrXXP1hupVQhPOrOVTNDMnWvd8T/939c1oa8AA16cVvrWVp3eiF1ZOh4DqeCSqwNUNg8sM1PTv0dtrRsJFGVblvaHDNoWfDeoA0xknVyCcDpqb3cIYAf7I5lwPF1VWR3Ak84uAIcJvN80PJqo4BbArdrONR29AvCEUMXZTVsHKEn7HQLt7ESmrfgQSs/GDlbAf/nsA7gCJn9ud+xiwlUCEgC2AHTMwJzpVcVjjQBhw6ZjEDVHtcznzQFP2mWAkgtUgX8s0GIGb4quQG5Dktg66eu042mHOJzXA76N50MYyzbE9ywkhAUq1zbi//fjdCErEPT9Ly8wnDCeC6pAAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADdklEQVRYR+2WXWwUZRSG3zPTbZosCSYS1FCaEDRKd7am/mQ72wDb2VpRIIELuCQaTAgxajRK0Bsx8YK/C0hQrgCN8YqFC/UCNJ0Vqp2mCSq70xITSEhoDAnRK39Synwv+ZZu3W5nd4a/lAvmcs97zvvs+c6cbwTz/Mg8++MhwIPZAT+f6RQaKZLtJH5tCxJjTw0NXaufl/MDXUkzWNBJsEvHBFIKzL/Hn/2+9E/c2ZrVgXKuJyeG7AaQqS9A4IO06+3Xv/udna3y+MK3CbwDoL1OOyHAwdS0NgpkBqDs9OwSyMfNEgT4KuV6W8Yc+xyB55oWJ05ZRe+VWABj+d6VpDobJdZxAscF2ASgBGKIZMEwjXZ9XAB6CawUYOGtWtxjuSM7m/6pyjneSJ4D8HQcAK0xBetXDHrflfoyrxoiSxTkUVN4BUquXicvJUSOwZBvk0Hr5/+Zk2tILtV5CjIhCZyxTnt/Vb3Ez2dfBDka13xKcVn3jyOX/T67CEFu7qzwk7Q7smus3+6mwnEAy2s1AvwB4Y7U4MjXlcEtOT2vGZBjMQHeslzvkO/YF+sLz8qnvAnhZxE1M5brjUrZsd8XYF8cALYkOhBMbRfiwzj6CM2g5Xr9UnayAwKejiookB9S7vBA2bGvyNxXLyo9NK6oXpByPvOY0LgaWYGy1zSMIwGD3yO1cQXEtsoeiLMDAJwkZIeA+vzvyUPBGzOLqNFUV51IXEsXvcW+Y18A8Mw9IRCVmgEYz2WtwGBBmuwDg8ZaZahlIA7dLYBeaGnX2zzrLvit3+5uCXl3/zeTLyx3+HU/b38JYsvdQCiRbNfgsDfnOp5eTAUAHaEGlL3ji5Z8tOLPCd2tDXcCIcDmlOvpJRX+RVR27KwQBQieCDfg4aRqe+9fc7JAYu3tQNSaNwTQgXEnu0pBnQBkUZgBBfvaWtWn1yfNAsGX4kDUmzcF0MHzfXbeFCkAfCTMQBc0JHADmicArG4GEWYeCaAFfp/9MgTaINkIQqZaflKJG1pjN9JUz7w+HuubsJy31wkrEK21BYTYmip6Ryug/b0dUOokgOdnaWoGrgFcnNPT29LeKKhAVKHftVzvQG22n7OfhAENkZ5u78y0N3KJ1YFqsr64AJUVmr9YxZ+/CSuqP2ihzBzAS1bRi3HJxWvAfVPdVgfuB8VDgHnvwE3N+j2LmpjNZQAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD2klEQVRYR8WWXWgcVRTH/2fStAVBLRgwCIKgVrN3E6WluzduYHc26kONoIJg/Iyi1o8Ha/vgk7YgKAptX7pYKLVqoYIfD/3we+4uSPZu0FbJzrbYKPigWKGCpQiJycyRO9lpN8tOJ7skZmBeZs4953fP+d9zLmGFH1rh+GgL4PuhDb1rurrXr7Zoar3Svy8FfCzA6XzmZo+9NwFsAnBdGJRA5xj8EwivC0d/0SnMZQFq9uAYgw80OL8AxgkAAyCsa/i+Wyj9cicQkQBuXr4HxmN1p1/5RDv6nbIOg0wOyyT5eJ6ALfVvfwqlr20XoiVA1Zb3EfCpcUbAgwmlP4py7OZTfWCrFvwn2iWc8rZ2IFoC1GxZYSBFhC0JR++Lc1jNprNkURHArAVO96nKybg1l7TUZFkblrezj5ME+jqhyndFOZrMpTZYbJ0XJf2zsanmBg8R8cMgvCgcvbdjgGpePkWM/QD2CKW3Rqbeljyfdj8hnIlT1Vz6fiL6BKCDQpXHOgZw7cF3AX6CiB5NOOVDUY7CHTPwTlLp54ydOw/1q1D6huUHCOvOKImizrlZeSMsTJn+kFDlno4BokpwOi/vmWPeuHa2e6/n+9Oza7wCgR4JM+Dm5DMgGMGOC6UzHQNEiTAsDYB/GPib6l3RY04PFCsTri2PABipB76sfhrhFn0Mf8hmr+62Zl4D8NK8Az4CxluiWBk32fEYRxfsmmibcMq74jIR24i6CCO3OvpY6GhqaKhnpmu6S5S+OxsIr177AInwBoBf6qcotonVG11rxsZWzOCda33ef1Np4rdGa9eWuy9lBGeF0r0BVF6+CsZOAH/5RCONLbw5WpvDiM8AdB6AUbl5rwh2Qfgm4eg7F8Dl5T4wjDB/9Dx/ZKAJPrITNhNGjePQzmQnqSo7WuWxlpfHmLEZwFGh9L2tbGLvA42LwgtJsGuL0kBQczOx3heOfrw5wKm7h3r9ubnPwLgNxAXhVF5oqwRxCq7l5CgTCgCuAqNkrV412vflt3806WQTwMcBugZEDwmn/GHsMYwLvCDAcCoD3zIQSYDPgPGkOZoLbHKpB0DWxwAOC6VHlxQgUP3wHdcT+4V6vS8AeFYofdj8m8xk1lG39wERNvvgsX5VObjkAKFD1x4sABwMJibazh4fJwsHCJBRQ6otES6mNK4tX7kozqYFq2asK28ZHzcZuvgsOYDxHIgTeBqEfmb6PLiomKz4nEuWKqVlB2jOlJuTRRCyKwLQOKim/X97NpZOnPtfM1Cz5dsMbAewVSi9Z0kb0WJEaWzMrbm59uHaZRHhYsHmu/gKP/8BBiqbMF28Xf4AAAAASUVORK5CYII=',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAERklEQVRYR81XXWgcVRT+zuxuVhSNYn1Q0VZRsd1JocTgzIZKcrPYF7Wo9EdBaSkoCkGR+lAUaqDig4JKQWlBWnzQ1Kr499KyOw3WZjbGWnBnU2lF00oVtSWmonaT3TlyZzPLZHbu7NIm4LzMzt5zz/nOuefnu4Q2n+97e6+cTbs5YtoA4jvAvARE13rbmc+B6CyYTjDxvlRFy9955Mhf7aimVkKlnLGcXG0QzBtBuKaVfB0QpkA0zJq7sytfPB63JxZAWWR3ADzIwFVtGQ4JEXAeoJ0Za/RF1X4lAEeYXwJYfTGGI/Yc1i37nihdkQAcYfwB0JIFMj6nhs/qVvG6sM4mAI4wfwKwbGGNN7RN6pZ9S1D3PAAlYX5AwLpFMj6Xn9jfZdnrfRsNADLhGPxCG8YPEngcrI0nkjQu5WtV7gG5PQzqAXBvKx0EetlPTA+ALDXNpWKLbP8TwJBu2W/4BkrCeEn+7rKK3ls+jjCfBbAdwNUxmX/e1diQJeoBcET2LYCfUm1g8FDQiAc6cFyM+WGV62VhbGdQA1izbnpbt0afpm9y3Z2XuR2nAHQqyuSXjGXfGF5zhMnB/3TLbkrosjDPMHCDwrHpC9rMUiqJ7GMEflflfYJw//KC/UUTgAFzFxhPeP8TdusF+8mwzPEB874a43N1ZOlxcvqND0H0sELooG7Za6LWjvUZyxIa+rwkdDGyaqQ4GSXnCPOAMjGZPyJHmN8CWKUI/2sZy36+VVbHrZeF+SoDWxUyx2QEToPopkgBokf0wuiwI7J7AN4kQz1b41d8b50+8za5Tx+xf5BvGZVUgrbVj4b26tboZmcguxHM70fqZ/5ZRuBvAJdHCXAydTOqM1sIJMvKe1zw5pVWca8zcPcKsFau54Cb0QtjE98JY5MG2uPLyupBsuMdqs6eVkTgn1gA6bTbeaFCzwUB+Enpea/h5Byq22UUwkknAaQSid3VmntGDSD2COqe+TUv6z2RSj6z4sDhX6VCLwryCApjE/I9sWb19bXZ6puynfu9odyfXcvEn8QdQVwSrs9Y9v5LS0JjB4NULV4mYXYYxBsicyCiw/ly0luqVrvlNyeTR/2ohPXElyHto5IwHyTgY5WXxMhlDtmF8HqrVuwdUX0uvK7SzcBDJMlmtcM9FcP3vk5WtFyYZLbTih1hTimHEmMqOaMtbWsYgTGiH7L7g540ekO9Dr2aD67LSRmsnuYozA0judBiHFsA/06gyYxlbwsbkd/BSSlL0WXsihlCkGR13jiWSsKEhBl5SrhDen7sKw9kn+H1ff9xCf8mOugkc+oKqlV7ibmbgZUXRUh8pSEmPEjAby6wboFp2jyGHEFKF4MR+y42M2MFLV8UZtzEiL30VdXoQjLkKMrm2/3/Xs18hI3LKfhRFW+MiOI0QO9d8uU0qFiS17SbfoDYXQuiW6Ov5/wjk/ZpRat8dlf+6HQ7Q+w/s8nyOEHfcZMAAAAASUVORK5CYII=',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEwElEQVRYR91Wa2hbZRh+3tPFjjlRBFH/KrPYnqQb7cg5mdXkHFxBXH8odmudwhS8grJ5YXY/1kK9Faz1h+BwTkWnYzJh24/a2Z4EWnNO5oa2SWqrTgoijImXom69JN8rX5oT0yxpUisUPD/P977v87y35/sIq/zRKuPj/0FgvLnpRkqlGlLMjQoQYw/F1AH710qqW7YCCUP/IgW0brTsnwoDJg3tMQF6kgC1CJjNoE6vFT21FJGSBEa3+q6sSq+vBfMJFty2Nu1Jbhge/lkGSwSD65lmDhLRdgJ9KyA+roJyLi3Ej1AQJKY7QAhKW2Z0eMP2y6VIlCSQCOlhN4jrrFo2jZmNNynsOSf/EaPjirXX9G7o758tBEiE9GYQXgdwqzyTvsVIlG1B0tR/EIydXsuOZrI39PFMUKI2dSh6pFyf44bWSaD9zHTYG47uLLQvSyBh6j0zNPdi4+DZ6bih7SNQN8Cvqpaztxy4e+5Wk8B31VlOf75f6RaY/lp1KCazzX1xQx8lwAeiY3W33dlKXV2iEhLJkOZnIoeBt7yW/XhlBAw9qlp2wDWOm/7riZXzDHxCwH0Anaiuvrq1WP+LkYob+gQB06pl+8sSGAv5GxRSzggWjb5w7Kx0iBuBrQQeUIh3MFMLA+0A+iGqW9VI5M9ylUgY2nGAWiCqr8q3X9SChOmvZaHsUQgaA3UEJAXDIUX0MlNrZpgEh7wRJ5Iw9ffBeJBAn6fnlO2+kZHfliKRG8asv2t72QwkgoGNUFjusFyh3RAUUSPRr5Omdj8zfchEz3qHoq/JAElTf4cZDwEUTq/BjvpT0QulSCQM/TBk1ZaqQG5qm/VreR6j5EG9K6myOmAlyYRD3iH74ZytqR8A4xEChueBtmKKmV3f01KXKpqBTHaGtr/OcrryM0oY+i8ETPH5aV0dH5/7Z820N0H0BAB7XnD7pogzle/3TUi7J010bFlbcLmyaS0gOi7/C+AFn2W/UkCuD8DTAL6EQLsasb/PETT0EwC2LUsHFgU3t4TAwmJwF4EeBXADM9/rDTufLrbTe8B4joCv1gi010Tsif9ACQObwXxagnstpzMe1IKkUDgLfBICe/KzTRpaN4P2yc0l4CIDmb3/V3eBC+aCu9kmjYDB4G4AOoCLACYBnmRgkkA+SLUEbl5oF+/yWc57pbajpBTnZdqnWvbuwgATpt+XYuVolkANgHW53SZyBHMsJbivcCAL45QmENKOkEI18+nq0KZI5Pd8xzEjcDuBPwL4oGyLPPuuqem6mar5uj9mKRaw7UvllLGkEMmD3J1f5MqNm/rdYHwA8BsueDGwpBHYJZjJG7YPLUWmaAXc8hcOjlRDwfQuwC8tBZ4RHlM/wEyzXiv61LIJyHLOelIX0sxafdiJndnWsK76L8/zBNoL4g51yOktFnRBLSkAolsgsDn7ouoDOAniaOH1LmMUr0D2FQNgCowpJvgJGIQietTB2EipjCQBEoomFGyhzB0ByOtbYXzGinAqIuAKh7wJmfEMAz4CxtSwPVDpYGVaYATeZuDSslrg9j4DTqK1GONKSYwbgQfSzJ5lD2GmAsRHVwK+MIT+2owCFjzrKtaBSjNdqV3ZV/FKAcr5rzqBvwF8fjc/lV9NmAAAAABJRU5ErkJggg==',
      ]
    }
  },
  created() {
    this.axios.get("/dj/banner").then((response)=>{
      this.banners = response.data.data
    });
    this.axios.get("/dj/recommend").then((response)=>{
      this.recommend = response.data.djRadios;
      this.shear_recommend = this.recommend.slice(0,3);
    })
    this.axios.get("/dj/today/perfered").then((response)=>{
      this.optimiz = response.data.data;
      this.optimiz = this.optimiz.map(item=>{
        return {...item,dj:{nickname:item.lastProgramName}}
      })
    })
    this.axios.get("/dj/program/toplist/hours?limit=48").then((response)=>{
      this.hours = response.data.data.list;
      this.hours = this.hours.map(item=>{
        return {...item,subCount:item.program.radio.subCount,id:item.program.radio.id,picUrl:item.program.coverUrl,dj:item.program.dj,name:item.program.name}
      })
      this.shear_hours = this.hours.slice(0,6)
    })
    this.axios.get("/dj/toplist?type=hot&limit=50").then((response)=>{
      this.hot = response.data.toplist;
      this.shear_hot = this.hot.slice(0,6);
    })
    this.axios.get("/dj/category/recommend").then((response)=>{
      this.classify = response.data.data.slice(0,6);
    })
  },
  methods:{
    switchNew(){
      this.shear_recommend = this.recommend.slice(this.length_commend,this.length_commend+3);
    },
    ToMore(title,data){
      this.$router.push({
        path:'/BroadCastMore',
        name:'BroadCastMore',
        query:{
          title
        },
        params:{
          data
        }
      })
    },
    ToMores(title,hash){
      this.$router.push({
        path:'/BroadCastMore',
        name:'BroadCastMore',
        query:{
          title
        },
        hash:'#k_' + hash
      })
    },
    play(){
      this.axios.get("/dj/program?limit=40&rid=" + this.optimiz[0].id).then(response=>{
        this.$store.state.play.currentList = response.data.programs;
        this.$store.state.play.currentMusic ={
          id:response.data.programs[0].mainSong.id,
          al:{
            name:response.data.programs[0].name,
            picUrl:response.data.programs[0].dj.avatarUrl
          },
          name:response.data.programs[0].name
        }
      }).then(()=>{
          this.axios.get("/lyric?id=" + this.optimiz[0].id).then(response=>{
              if(!response.data.lrc){
                this.$store.state.play.lyric = [{text:'暂无歌词'}]
                return;
              }
              this.lyricStr = response.data.lrc.lyric;
              var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
              this.lyricStr = this.lyricStr
              .split("\n")
              .filter(e=>e)
              .map(str=>{
                  var time = str.match(patt)[0].replace(/(\[|\])/gi,"");
                  var timeArr = time.split(":");
                  time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
                  var text = str.replace(patt,"");
                  return {time,text};
              })
              if(this.currentMusic.id == this.optimiz[0].id){
                this.$store.state.play.lyric = this.lyricStr
              }
          });
      });
    }
  },
  watch:{
    banners() {
      setTimeout(() => {
        new Swiper(".main-swiper-container", {
          loop: true,
          pagination: {
            el: ".main-swiper-pagination",
          },
          autoplay: true,
        });
      }, 500);
    },
    shear_recommend(){
      this.length_commend = this.shear_recommend.length + this.length_commend;
      if(this.length_commend>=this.recommend.length-1){
        this.length_commend = 0;
      }
    },
  },
}
</script>

<style lang="less">
.BroadCastStation{
  width: 100%;
  padding-top: 100px;
  .load{
    width: 100vw;
    height: calc(100vh - 150px);
    position: relative;
    >div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      p{
        font-size: 14px;
        // color: #ff0000;
        font-weight: bold;
      }
      i{
        display: inline-block;
        width: 3px;
        height: 22px;
        background-color: red;
        margin-left: 3px;
        animation: jump .6s infinite -0.4s linear alternate;
        transform-origin: center bottom;
        &:nth-child(2){
          animation-delay: -0.2s;
        }
        &:nth-child(3){
          animation-delay: 0s;
        }
        &:nth-child(4){
          animation-delay: 0.2s;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
      @keyframes jump {
        0%{
        }
        100%{
          transform: scaleY(0);
        }
      }
    }
    
  }
  .main-swiper-container{
    width: 100%;
    margin-bottom: 20px;
    .swiper-wrapper {
      .swiper-slide {
        span {
          position: absolute;
          right: 0;
          bottom: 5px;
          color: white;
          padding: 6px 10px 6px 15px;
          background-color: #d44a42;
          border-radius: 20px 0 0 20px;
          font-size: 14px;
        }
        img {
          vertical-align: middle;
        }
      }
    }
    .swiper-pagination-bullet {
      background-color: rgba(255, 255, 255, 1);
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background-color: #cc5249;
    }
  }
  .recommend{
    width: 100%;
    padding: 0 10px;
    .broadCastList{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .classify{
    width: 100%;
    padding-bottom: 10px;
    .ModuleTitle{
      padding: 0 5px;
    }
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        height: 50px;
        flex: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #e4e6e7;
        position: relative;
        &:nth-child(2n){
          &::before{
            content: "";
            width: 1px;
            height: 30px;
            display: block;
            background-color: #e4e6e7;
            position: absolute;
            left: 0;
          }
        }
        &:last-child,&:nth-child(5){
          border-bottom: 1px solid #e4e6e7;
        }
        img{
          margin-right: 20px;
        }
      }
    }
  }
  footer{
    width: 100%;
    text-align: center;
    color: #dee0e1;
    padding-bottom: 10px;
  }
}
</style>