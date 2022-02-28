<template>
    <div class="max-w-screen flex flex-col pt-10">
        <div class="text-center">
            <h2>"Lets Compress"</h2>
            <p>Compressing and Comparing Files</p>
        </div>
        <div class="justify-center">
            <img class="thisImage" src="/compressingsteps.jpeg" alt="Steps">
        </div>
        <div class="">
            <form
                action=""
                @submit.prevent="uploads"
                enctype="multipart/form-data"
                class="text-center max-w-screen"
            >
                <div class="min-w-full pt-5 border-2 border-dotted border-black rounded flex">
                    <!-- <label class="block text-left text-sm font-medium text-gray-700">
                        Device data files
                    </label> -->
                    <div
                        class="
                        w-full
                        mt-1
                        flex
                        justify-center
                        py-6
                        px-6
                        "
                    >
                        <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p class="pl-1 text-l">Drag and Drop Files</p>
                            <p>or</p>
                            <label
                                for="file-upload"
                                class="
                                bg-gray-100
                                cursor-pointer
                                rounded
                                px-2 py-2
                                mt-2
                                font-medium
                                text-indigo-600
                                hover:text-indigo-500
                                focus-within:outline-none
                                focus-within:ring-2
                                focus-within:ring-offset-2
                                focus-within:ring-indigo-500
                                "
                            >
                                <span>Upload a file</span>
                                <input
                                id="file-upload"
                                name="file"
                                type="file"
                                class="sr-only"
                                ref="file"
                                required
                                />
                            </label>
                            <p class="text-xs mt-6 text-gray-500">.pub, .xml, .txt up to 100MB</p>
                        </div>
                    </div>
                </div>
                <button class="py-2 px-8 w-full rounded bg-blue-300" type="submit">
                Save File
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFile: null
        };
    },
    methods: {
        async uploads(e) {
            this.selectedFile = e.target.file;
            let formData = new FormData();
            formData.append('file',this.selectedFile);
            console.log(`Our file before upload is:: ${this.selectedFile}`);

            await this.$axios.post('/api/uploads', formData)
            .then((response) => {
                this.$toast.success(`{response.statusText}! Upload Successful..`, {
                    action: {
                        text: 'X',
                        onclick: (e, toastObj) => {
                            toastObj.goAway(0);
                        }
                    },
                    position: 'top-center',
                    duration: 7000
                });

                this.$router.replace('/filelist');
            })
            .catch((error) => {
                console.log(error);
                this.$toast.error(`Error while trying to upload! Please try again!`, {
                    action: {
                        text: 'X',
                        onclick: (e, toastObj) => {
                            toastObj.goAway(0);
                        }
                    },
                    position: 'top-center',
                    duration: 7000
                });
            });
        },
    },
};
</script>

<style scoped>
.thisImage {
    max-height: 300px;
    min-width: 100%;
}
</style>