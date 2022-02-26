<template>
    <div class="bg-default min-h-screen">
        <auth-login/>
    </div>
</template>

<script>
export default {
    middleware: 'guest',
}
</script>