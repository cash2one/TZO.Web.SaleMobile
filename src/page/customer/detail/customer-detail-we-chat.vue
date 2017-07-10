<template>
    <div class="rating_page">
        <header-title header-title="客户微信推广" go-back='true'>
        </header-title>
        <p>OK</p>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'

export default {
    data(){
            return{                
                customerId:'', // 当前客户id   
              
            }
        },

        mounted(){
            this.customerId = 1;//this.$route.params.customerId;
           
        },

    components: {
        headerTitle
    },
}

</script>