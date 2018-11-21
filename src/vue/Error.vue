<template>
    <div class="error">
        <div class="error-img"><img :src="error" alt="error"/></div>
        <div class="error-title">Page not found!</div>
        <div class="error-subtitle">The page can not be viewed or does not exist</div>
        <div class="error-subtitle">Wrong address entered</div>
        <div class="error-subtitle">Page redefinition or program error</div>
    </div>
</template>
<script>
    import error from 'src/images/error.png'

    export default {
        data() {
            return {
                error: error
            }
        }
    }
</script>
<style scoped>
    .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .error-img {
        margin: 0 auto;
        width: 178px;
        height: 166px;
    }

    .error-img img {
        width: 100%;
    }

    .error-title {
        margin: 10px auto;
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        letter-spacing: 1px;
    }

    .error-subtitle {
        font-size: 16px;
        text-align: center;
        letter-spacing: 1px;
    }
</style>