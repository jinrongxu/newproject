(function() {

    //获取节点
    var play = document.querySelector(".play"), //播放按钮
        rotate = document.querySelector(".rotate-img"), //小圈图片
        audio = document.querySelector(".audio"), //音频
        prev = document.querySelector(".prev"), //前一个
        next = document.querySelector(".next"), //后一个
        mask = document.querySelector(".mask"), //背景大图
        startTime = document.querySelector(".startTime"), //开始时间
        endTime = document.querySelector(".endTime"), //结束时间
        center = document.querySelector(".center"), //进度条总长
        centerCon = document.querySelector(".center-con"), //进度条改变
        centerPoint = document.querySelector(".center-point"); //小圆点

    var centerWidth = center.offsetWidth;

    // console.log(centerWidth)
    var arr = [{
        "music": "./video/6诗人 - 卡布奇诺 [mqms2].mp3",
        "pic": "./img/kim.jpg"
    }, {
        "music": "./video/195.白小白 - 不甘示弱.mp3",
        "pic": "./img/img2.jpg"
    }, {
        "music": "./video/不才 - 涉川 [mqms2].mp3",
        "pic": "./img/img4.jpg"
    }, {
        "music": "./video/刀郎 - 西海情歌.mp3",
        "pic": "./img/img3.jpg"
    }, {
        "music": "./video/林俊杰 - 不潮不用花钱 [mqms2].mp3",
        "pic": "./img/img1.jpg"
    }, {
        "music": "./video/陈晓赵丽颖 - 心情 [mqms2].mp3",
        "pic": "./img/small.jpg"
    }];

    var index = 0,
        flag = false;


    //点击播放按钮
    play.addEventListener('click', function() {
        if (audio.paused) {
            rotate.classList.remove("active");
            this.classList.add("active");
            audio.play();
        } else {
            rotate.classList.add("active");
            audio.pause();
            this.classList.remove("active");
        }
    })


    //点击前按钮
    prev.addEventListener('click', function() {
        flag = true;
        index--;
        if (index < 0) {
            index = arr.length - 1;
        }
        change();

    })

    //点击下个按钮
    next.addEventListener('click', function() {

        nextPlay();

    })

    //当前音乐播放完成之后直接进入下一个
    audio.addEventListener('ended', function() {
        nextPlay();
    })

    var startT, endT;
    //进行缓存的音乐
    audio.addEventListener('canplaythrough', function() {
        if (flag) {
            this.play();
        }

        startT = getTime(this.currentTime);
        endT = getTime(this.duration);
        startTime.innerHTML = startT;
        endTime.innerHTML = endT;

    })

    //播放过程
    audio.addEventListener("timeupdate", function() {

        progress(this.currentTime, this.duration);

    })

    //小点改变
    var startX, endX;
    centerPoint.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX - this.offsetLeft;
    }, false)

    centerPoint.addEventListener('touchmove', function(e) {
        endX = e.touches[0].pageX - startX;

        if (endX < 0) {
            endX = 0;
        } else if (endX > centerWidth) {
            endX = centerWidth;
        }


        var newTime = endX / centerWidth * audio.duration;
        audio.currentTime = newTime;
    })

    //播放下一个的函数
    function nextPlay() {
        flag = true;
        index++;
        if (index > arr.length - 1) {
            index = 0;
        }
        change();
    }

    //切换时不同的改变
    function change() {
        audio.setAttribute('src', arr[index].music);
        rotate.style.background = `url(${arr[index].pic})`;
        mask.style.background = `url(${arr[index].pic})`;

        audio.addEventListener('canplaythrough', function() {
            endT = getTime(this.duration);
            endTime.innerHTML = endT;
        })



    }
    //加零函数
    function zero(n) {
        return n >= 10 ? n : '0' + n;
    }

    //获取时间
    function getTime(s) {
        return zero(Math.floor(s / 60)) + ":" + zero(Math.floor(s % 60));
    }

    //播放过程
    function progress(currentTime, duration) {

        startTime.innerHTML = getTime(currentTime);

        var desWidth = currentTime / duration * centerWidth;
        centerCon.style.width = desWidth + "px";



    }
})();