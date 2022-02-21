<template>
    <div class="bg-default min-h-screen">
        <landing-home />
    </div>
</template>
<script>
export default {
    middleware: 'auth'
}
</script>