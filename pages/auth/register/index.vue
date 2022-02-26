<template>
    <div class="bg-default min-h-screen">
        <auth-register/>
    </div>
</template>
<script>
export default {
    middleware: 'guest',
}
</script>