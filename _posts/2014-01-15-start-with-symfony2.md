---
layout: post
title: symfony2 使用总结
cat: symfony2
---

###symfony2 目录结构

```sh
    sf2/ <- Symfony2解压目录
        app/ <- 存放symfony的核心文件的目录
            cache/ <- 存放缓存文件的目录
            config/ <- 存放应用程序全局配置的目录
            logs/ <- 存放日志的目录
        src/ <- 应用程序源代码
            ...
        vendor/ <- 供应商或第三方的模组和插件
            ...
        web/ <- Web入口
            app_dev.php <- 生产环境下的前端控制器
            ...
```

###配置文件

配置文件路径 `/sf2/app/config/parameters.yml`


###创建Bundle

```php
php app/console generate:bundle --namnespace=path/file --format=yml
```

之后会有一系列的确认


###注册Bundle

使用`app/console` 工具能够自动帮我们注册Bundle，可以节省很多时间，但是有的时候我们需要修改bundle名字，修改namespace，那么就需要手动注册Bundle。

```php
//app/AppKernel.php

<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new Acme\StudyBundle\AcmeStudyBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Acme\DemoBundle\AcmeDemoBundle();
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
```

其中 `new Acme\StudyBundle\AcmeStudyBundle()` 便是我们新注册的Bundle
