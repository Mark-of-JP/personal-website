---
title: 'What Are and How To Create (Prediction vs. Confidence vs. Tolerance) Intervals'
date: 'May 30 2022'
excerpt: 'Creating "prediction intervals" is its own art and not all processes are made equal. In this article we will go through explaining what confidence, prediction and tolerance intervals are, the differences between them and how to create them.'
post_image: '/posts/images/chris-liverani-dBI_My696Rk-unsplash.jpg'
---

# What are Prediction Intervals (in general)?

Luckily, prediction intervals are aptly named. Unluckily, the term "prediction interval" is very often misused as not all intervals related to predictions are prediction intervals. In general though, a prediction interval is an interval/range of values that should, theoretically, encapsulate the true value. The differing types of "prediction intervals" just dictate how the intervals are set up and what information the interval gives you. There are many benefits of predicting an interval over predicting just a single point. Prediction intervals can show the uncertainty of your model's predictions, give insight to the underlying distribution, and give you some domain specific insights.

There are many different types of predictions intervals you can construct. Each with their own benefits and caveats. Here we will focus on two types of prediction intervals, confidence intervals and quantile ranges.

# Prediction Intervals

Let's start off with the most unfortunately named one of the bunch. A prediction interval is an interval that is constructed to contain the the true value with some sort of probability. So for example, a 95% prediction interval of [5, 10] is one such that the probability of the true value being between 5 and 10 is 95%. 

So in other words, if Y is our dependent variable and X contains our independent variable, a 95% prediction interval [u, l] would define this relationship: Pr(u < Y < l| X) = 0.95

This type of interval is very useful in understanding the uncertainty of your model given your independent variables. Let's say for example you wanted to predict the price of a stock. For one day a model might spit out $10 and for another day it might spit out $10.50. While you might decide to make trades on both days due to what your model told you, it would be way more informative if the model spat out a prediction interval of [$9, $11] for the first day and [$5.50, $15.50] for the second day. Now, even though those two predictions were initially very similar, we can see that the prediction interval for the second day is way larger than the one for the first day. If you were a trader, you would probably be very wary about taking the $10.50 prediction.

Another powerful piece of information you can take away from prediction intervals is that you can actually utilize them figure out the underlying distribution of the data. If you set differing percentage thresholds, you can intuitively figure out the conditional distribution of your dependent variable.

## How To Create Prediction Intervals?

There are a couple of ways to create prediction intervals and the methods found here are not exhaustive.

### Naive Constant Residuals

One simple and naive way to construct prediction intervals is to just take all of the residuals of your model and use the distribution of the residuals to create your prediction intervals. For example, if you notice that the residuals of your model is normally distributed (this is actually an assumption of some models) with a certain variance, you can add and subtract a desired upper and lower limit of the normal distribution unto your prediction. 

With this method, your prediction interval width will be constant no matter independent variables. This is useful if you want to show the overall uncertainty of your model. There are some assumptions that are utilized in this prediction interval such as residuals following a constant distribution over the whole space.

Be wary of the residuals you utilize. Using the training residuals can be useful but only if your confident that your model isn't overfitting its training set. My recommendation is to utilize the residuals found in your validation set as you can be somewhat certain that your model isn't overfitting to those values (if you are doing it correctly).

For more info on this, you can look here: [https://otexts.com/fpp2/prediction-intervals.html](https://otexts.com/fpp2/prediction-intervals.html)

### Having Another Model Predict The Uncertainty

A main problem with the first method is that you are assuming that the variance of the residuals is constant. What do you do if the variance isn't constant but the distribution is?

Well the answer is simple! You create a model to predict the residual variance given your independent variables. It might seem and feel a bit weird to use another model to predict the uncertainty of our current model but this method is very powerful. 

A famous example of this dual model method is the ARIMA-GARCH model which is used heavily in the field of econometrics. There are many different variations of the ARIMA-GARCH model such as the SARIMA-EGARCH and ARMA-ARCH model, but at its very core all the models aim to predict a value and its uncertainty. The ARIMA-GARCH model is made up of two distinct models, the ARIMA and the GARCH model. The ARIMA model is a time series model which predicts a future value using historical data. The GARCH model then predicts the volatility/variance of the error term. With knowledge of the conditional variance, you can construct your prediction interval using your ARIMA model output and your knowledge of the desired quantiles of the conditional error distribution.

As you can see this method is much more powerful assuming the variance of the error term isn't constant. The prediction intervals will be small when the model is very certain and large when uncertainty occurs. 

Be wary of the methods and models you use. Always check the assumptions of each model to make sure you are using it properly. Also notice that this method assumes that the distribution of conditional errors are all the same and only differing by their variance parameter. So if your model constantly switches conditonal error distribution, you need to take that into account in your calculations.

For more info on this, you can look here: [https://iopscience.iop.org/article/10.1088/1757-899X/548/1/012023/pdf](https://iopscience.iop.org/article/10.1088/1757-899X/548/1/012023/pdf)

### Quantile Predictor

The problem with the previous methods is that you ultimately need to figure out some sort of underlying distribution for the error terms. This last and final method is useful if you don't want to assume any underlying distributions.

Quantile regression could be the solution you are looking for. Quantile regression predicts the conditional quantile of the dependent variable. So, instead of predicting the future value, you can predict a number such that 95% of conditional distribution will be below that number. Creating another model (or modifying the existing one) to predict the 5% quantile and you have a 90% prediction interval.

Not all quantile regression models are made equal so definitely check any assumptions of the models you are using. But most models are non-parametric. Two models you can look at are the linear quantile regression and random forest quantile regression models.

A problem with most quantile regression models is how data hungry they are. To get stable, trustworthy predictions, you need a large training set. So if your dataset in small, consider using one of the above methods instead.

For more info on this, you can look here: [https://www.mygreatlearning.com/blog/what-is-quantile-regression/](https://www.mygreatlearning.com/blog/what-is-quantile-regression/)

# Confidence Intervals

If you have taken any statistics class, you should be aware of our friend the confidence interval. While confidence intervals and prediction intervals usually revolve around the same value, the two types of intervals demonstrate completely different types of information.

Prediction intervals show you the uncertainty of a prediction due to the underlying conditional distribution of the dependent variable. Confidence intervals show you the uncertainty of a prediction due to the model you are using. 

That statement may be a bit confusing so we will break it down. 

The first thing we need to clarify is what do most models actually predict? Obviously the answer is that it predicts the true value of the dependent variable but we will add a bit more nuance to that answer. Most models actually predict E[Y | X] or in other words, the expected value of Y conditioned on X. This might be hard to wrap your head around if you aren't too trained in statistics but in other words it means that most models predict the expected value, most likely value, of Y given your independent variables X.

So using these terms, we can better define prediction intervals and confidence intervals. Predictions intervals give you a clue on the distribution of Pr(Y | X) while confidence intervals give you the distribution of E[Y | X]. Another key difference is that as your sample size grows, your confidence interval should get smaller as your confidence in your model increases. This isn't necessarily true for prediction intervals as the distribution and uncertainty of your Y conditioned on X is not dependent on the sample size.

To finally hit this topic home, since the distinction is important, imagine that we have the data for income in Canada. A prediction interval would take into account the distribution of income and use that to construct the interval. So no matter how many more samples we take, as long as our original sample size is indicative of the population, our prediction intervals will remain mostly stable. If we constructed a model that predicted the mean of the average income, we can see that the more samples we take, the closer we are to that true value. So our confidence interval would shrink as we take more samples. Here we would say we are % confident in this interval. As we can see even though both intervals come from the same value, they portray very different values.

## How To Create Confidence Intervals?

That's enough of figuring out what is a confidence interval. Let's see how we can actually construct one. Again, this list is not exhaustive.

### From The Distribution

If you are aware of the distribution of your conditioned dependent variable, then this process is very straight forward. There are countless of papers out there that will let you know the simple formula you need to use if you want to create a confidence interval for a well-known distribution/model.

For example, the sample mean with known variance is normally distributed (waiving some assumptions here). So, if you want to construct a 90% confidence interval, you would take the sample mean and then add and subtract the 95% quantile of a standard normal distribution multiplied by the standard deviation over the square root of samples you have. This would be a 90% confidence interval of the true mean.

For more info on this, you can look here: [https://www.statisticshowto.com/probability-and-statistics/confidence-interval/](https://www.statisticshowto.com/probability-and-statistics/confidence-interval/#:~:text=A%20confidence%20interval%20for%20the%20mean%20is%20a%20way%20of,and%207%20is%20the%20upper.)

### Bootstrapping Your Model

If you are unaware of the distribution, or if your model is too complicated to extract a reliable distribution off of it, you can just bootstrap your model. 

Bootstrapping is the process of taking your training set, generating new training sets from the original set by sampling with replacement, and then training new models on those new samples. With those models you predict your desired value and now order those prediction from least to greatest. To get a 90% confidence interval, you take the prediction that is greater than 5% of the other model predictions as your lower bound and take the prediction that is greater than 95% of the other model predictions as your upper bound.

So, to be more precise, you can create 100 other samples from your original training set by sampling with replacement, train 100 different models on each of the samples, use each model to predict your desired value, order the predictions from least to greatest, then take the 5th and 95th prediction as your lower and upper bound respectively for your 90% confidence interval.

The benefit of this method is that you can do this with any model. It is computationally expensive though, as you are training multiple different models but luckily that process can be done with some parallelization. The main assumption you have to make with this process is believe that your model is correct. If you are completely incorrect in your construction of the model (potentially due to some model assumption violations) then your confidence interval will be pointless. Also lastly, you must always ALWAYS say that you are % confident with the interval. Never say that the probability of the true value being in the interval is 90%. If you were in a statistics class, you would be heavily penalized for such statement. Trust me, I have lived through that pain.

For more info on this, you can look here: [https://moderndive.com/8-confidence-intervals.html](https://moderndive.com/8-confidence-intervals.html)

# Tolerance Interval

Last but not least, we have the tolerance interval. In my experience these types of intervals are rarely used but can be very powerful. They combine the two main ideas of prediction intervals and confidence intervals.

Effectively, tolerance intervals are prediction intervals with an amount of confidence behind them. So to construct a confidence interval you need to specify your desired proportion of the population you want to capture and then your confidence level. This is really useful when you really need to be certain that your interval captures a proportion of your data's distribution. For example, if it's really important that you can capture the 95% quantile, you can improve your prediction with some confidence by creating a tolerance interval.

To create a simple tolerance interval, you can combine one of your methods of creating a prediction interval with a method of creating a confidence interval. 

For more information you can look here: [https://support.minitab.com/en-us/minitab/18/help-and-how-to/quality-and-process-improvement/quality-tools/supporting-topics/tolerance-interval-basics/](https://support.minitab.com/en-us/minitab/18/help-and-how-to/quality-and-process-improvement/quality-tools/supporting-topics/tolerance-interval-basics/)

# Intervals in general

There are many different types of intervals that aren't listed here. For example, a famous way to generate intervals for a forecast is with the use of George Brownian Motion so make sure you choose your type of interval carefully.

So those are the main 3 types of intervals I have come across. I hope this article was helpful as a jumping point to do research into what kind of interval you are looking to create! At the very least, I found it difficult to find information on the topic without knowing what to Google.

