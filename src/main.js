import Vue from 'vue'
import _ from 'lodash'
import {Time} from './time'

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');
new Vue({
  el: '#app',
  data:{
    order:{
      keys:['pontos','gm','gs'],
      sort:['desc','desc','asc']
    },
    filter:'',
    colunas:['nome','pontos','gm','gs','saldo'],
    times:[
      new Time("Gremio",require('./assets/gremio.png')),
      new Time("Atletico PR",require('./assets/atletico_pr.png')),
      new Time("Atletico MG",require('./assets/atletico_mg.png')),
      new Time("Corinthians",require('./assets/corinthians.png')),
      new Time("Cruzeiro",require('./assets/cruzeiro.png')),
      new Time("Flamengo",require('./assets/flamengo.png')),
      new Time("Fluminense",require('./assets/fluminense.png')),
      new Time("Palmeiras",require('./assets/palmeiras.png')),
      new Time("Santos",require('./assets/santos.png')),
      new Time("São Paulo",require('./assets/sao_paulo.png')),
    ],
    novoJogo: {
      casa: {
        time:null,
        gols:0
      },
      fora: {
        time:null,
        gols:0
      }
    },
    view:'tabela'
  },
  created(){

  },
  methods:{
    fimJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario,gols,golsAdversario);
      this.toggleNovoJogo();
    },
    createNovoJogo(){
      let indexCasa = Math.floor(Math.random()*10),
      indexFora = Math.floor(Math.random()*10);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.toggleNovoJogo();
    },
    toggleNovoJogo(){
      if(this.view == 'tabela'){
        this.view = 'novoJogo';
      }else{
        this.view = 'tabela';
      }
    },
    sortBy(coluna){
      this.order.keys = coluna;
      this.order.sort = (this.order.sort == 'desc')?'asc':'desc';
    }
  },
  computed:{
    timesFiltered(){
      let data = _.orderBy(this.times,this.order.keys,this.order.sort);
      return _.filter(data,item=>{
        return item.nome.indexOf(this.filter) >= 0;
      })
    }
  },
  filters:{
    uppercase(str){
      return str.toUpperCase();
    }
  }
})
