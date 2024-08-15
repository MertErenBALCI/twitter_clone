module.exports.error_tr = [
    {
        status: false,
        desc: 'DB SERVER ERROR.',
        errorCode: 9999,
        httpStatus: 500,
        result: {}
    },
    {
        status: false,
        desc: 'Yetkisiz erişim.',
        errorCode: 8888,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'data bulunamadı!!!',
        errorCode: 7777,
        httpStatus: 404,
        result: {}
    },
    {
        status: false,
        desc: 'email veya şifre hatalı!!!',
        errorCode: 6666,
        httpStatus: 401,
        result: {}
    },
    {
        status: false,
        desc: 'project_id zorunlu alan.',
        errorCode: 1,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'device_id, device_no, type ve datetime zorunlu alan.',
        errorCode: 2,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'no zorunlu alan.',
        errorCode: 3,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'data object olamalı.',
        errorCode: 4,
        httpStatus: 422,
        result: {}
    },
    {
        status: false,
        desc: 'data boş object olamalı.',
        errorCode: 5,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'email, password, name, surname ve role zorunlu alan.',
        errorCode: 6,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'Yetkisiz erişim...',
        errorCode: 7,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'Email formatı uygun olmalı.',
        errorCode: 8,
        httpStatus: 422,
        result: {}
    },
    {
        status: false,
        desc: 'Şifre en az 6 karakter uzunluğunda olmalı.',
        errorCode: 9,
        httpStatus: 422,
        result: {}
    },
    {
        status: false,
        desc: 'role mevcut değil.',
        errorCode: 10,
        httpStatus: 422,
        result: {}
    },
    {
        status: false,
        desc: 'password hash error.',
        errorCode: 11,
        httpStatus: 400,
        result: {}
    },
    {
        status: false,
        desc: 'email ve password zorunlu alan.',
        errorCode: 12,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'user_id zorunlu alan.',
        errorCode: 13,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'old_password ve new_password zorunlu alan.',
        errorCode: 14,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'plate_no ve category zorunlu alan.',
        errorCode: 15,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'vehicle_id zorunlu alan.',
        errorCode: 16,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'guiToken bilgisi alınırken hata meydana geldi. ',
        errorCode: 17,
        httpStatus: 500,
        result: {}
    },
    {
        status: false,
        desc: 'Böyle bir email kaydı zaten var. ',
        errorCode: 18,
        httpStatus: 409,
        result: {}
    },
    {
        status: false,
        desc: 'Erişim kısıtlı kullanıcı. ',
        errorCode: 19,
        httpStatus: 400,
        result: {}
    },
    {
        status: false,
        desc: 'Oturum anahtarı bulunamadı. Lütfen tekrar deneyin',
        errorCode: 20,
        httpStatus: 401,
        result: {}
    },
    {
        status: false,
        desc: 'Kullanıcı bilgisi alınırken hata meydana geldi. Middlewares',
        errorCode: 21,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'Oturum anahtarı çözülemedi. Lütfen tekrar deneyin.',
        errorCode: 22,
        httpStatus: 401,
        result: {}
    },
    {
        status: false,
        desc: 'Oturum anahtarı yanlış. Lütfen tekrar deneyin.',
        errorCode: 23,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'bus_id ve comment zorunlu alan. ',
        errorCode: 24,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'blacklist_id zorunlu alan. ',
        errorCode: 25,
        httpStatus: 406,
        result: {}
    },
    {
        status: false,
        desc: 'Veri bulunamadı. ',
        errorCode: 26,
        httpStatus: 404,
        result: {}
    },
    {
        status: false,
        desc: 'Email veya Şifre hatalı. ',
        errorCode: 27,
        httpStatus: 400,
        result: {}
    },
    {
        status: false,
        desc: 'Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır!!!',
        errorCode: 28,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'Bu işlemi gerçekleştirmek için yetkiniz bulunmamaktadır!!',
        errorCode: 29,
        httpStatus: 403,
        result: {}
    },
    {
        status: false,
        desc: 'Oturum anahtarı doğrulanamadı. ',
        errorCode: 30,
        httpStatus: 401,
        result: {}
    },
    {
        status: false,
        errorCode: 3001,
        httpStatus: 401,
        desc: 'Güvenlik sebebiyle oturumunuz sonlandırıldı.',
        result: {}
    },
    {
        status: false,
        errorCode: 3002,
        httpStatus: 401,
        desc: 'Kullanılabilir refresh_token bulunamadı.',
        result: {}
    },
    {
        status: false,
        errorCode: 31,
        httpStatus: 401,
        desc: 'Yenileme anahtarı bulunamadı.',
        result: {}
    },
];

module.exports.error_en = [
    {
        status: true,
        errorCode: 0,
        httpStatus: 200,
        desc: 'SUCCESSFULL',
        result: {}
    },
    {
        status: false,
        errorCode: 1,
        httpStatus: 400,
        desc: 'country not found baby',
        result: {}
    },
    {
        status: false,
        errorCode: 2,
        httpStatus: 404,
        desc: 'where is the country baby',
        result: {}
    },
    
];