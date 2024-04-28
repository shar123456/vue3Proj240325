<template>
    <div class="outItem">
    <div class="outItemUp">
        <!-- <img :src="products.cover_url" alt="" srcset=""> -->
        <img v-lazy="((products.cover_url).indexOf('http')>-1||(products.cover_url).indexOf('https')>-1)?products.cover_url:require('../../assets/images/' + products.cover_url)"   />
    </div>
    <div class="outItemDown">
   <span class="outItemDown_Tilte">{{products.Title}}</span>
    <span class="outItemDown_price"><text>￥</text>{{products.Price}}</span>
    </div>
</div>
</template>

<script>
export default {
     props:{
        products:{
            type:Object,
default(){
    return {};
}
        }
    },
    setup () {
        

        return {}
    }
}
</script>

<style  scoped>
.outItem{
    border:1px solid rgba(238, 238, 238, 0.795);
    border-radius: 7px;
    height:190px;
    width:48%;
    margin-left:1.2%;
     margin-top:5px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
}
.outItemUp{
width:100%;
height:70%;
border:0px solid red;
}
.outItemUp img{
    width:100%;
    height:100%;
     
}
.outItemDown{
width:100%;
height:30%;
border:0px solid red;
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
}
.outItemDown_Tilte{
    width:100%;
border:0px solid red;

overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;


 font-weight:400;
  color:#333;
  font-size: 15px;
  text-align: center;
 
}
.outItemDown_price{
    margin-top:5px;
    border:0px solid red;
    color:red;
    font-weight: 600;
     font-size: 14px;  text-align: center;
}
</style>