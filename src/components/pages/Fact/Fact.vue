<script>
export default {
    name: 'Fact'
}
</script>

<template>
    <!-- Fact Start -->
    <div class="container-fluid py-5">
        <div class="container container-style">
            <div class="outer-shade-style p-5 rounded">
                <div class="row g-4 justify-content-center">
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5 card-style">
                            <i class="fa fa-users text-secondary"></i>
                            <h4>satisfied customers</h4>
                            <h1>1963</h1>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5 card-style">
                            <i class="fa fa-users text-secondary"></i>
                            <h4>quality of service</h4>
                            <h1>99%</h1>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5 card-style">
                            <i class="fa fa-users text-secondary"></i>
                            <h4>quality certificates</h4>
                            <h1>33</h1>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5 card-style">
                            <i class="fa fa-users text-secondary"></i>
                            <h4>Available Products</h4>
                            <h1>789</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fact Start -->
</template>

<style scoped>
.outer-shade-style {
    background: #f9f9f9;
}

.card-style h4 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}


@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px;
        margin: auto;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1024px) {
    .container-style {
        max-width: 900px;
        margin: auto;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        width: 100%;
        margin: auto;
    }

    .card-style i {
        font-size: 52px;
    }
    .card-style h4 {
        font-size: 12px;
    }
    .card-style h1 {
        font-size: 12px;
    }
}
</style>