<template>
    <div class="flex flex-row">
        <h1>All files are listed here!</h1>
        {{files}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            files: null
        }
    },
    methods: {
        async getFiles() 
        {
            await this.$axios.get('/api/fileslist')
            .then((response) => {
                this.files = response;
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(()=>{
                // 
            })
        }
    },
    mounted() {
        this.getFiles();
    }
}
</script>