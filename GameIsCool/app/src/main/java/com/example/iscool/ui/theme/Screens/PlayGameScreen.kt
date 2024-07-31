package com.example.iscool.ui.theme.Screens

import android.os.Handler
import android.os.Looper
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.iscool.R
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.unit.sp

@Composable
fun PlayGameScreen(
    navController: NavHostController
){
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp), // Add spacing between buttons
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Button(
                onClick = { navController.navigate("StartGameRoute") },
                modifier = Modifier
                    .weight(1F)

            ) {
                Text(stringResource(R.string.cancelButtonText))
            }
            Button(
                onClick = { navController.navigate("PlayGameRoute") },
                modifier = Modifier
                    .weight(1F)

            ) {
                Text(stringResource(R.string.restartButtonText))
            }
        }
        PictureWithButton(
            navController = navController,
            modifier = Modifier
                .fillMaxSize()
                .wrapContentSize(Alignment.Center)
        )
    }
}
@Composable
fun PictureWithButton(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    // State for handling the result and points
    var result by remember {
        mutableStateOf(5)
    }
    var points by remember {
        mutableStateOf(0)
    }
    // Selecting an image resource based on the current result
    val imageResource = when(result) {
        1 -> R.drawable.iscool_01
        2 -> R.drawable.iscool_02
        3 -> R.drawable.iscool_03
        4 -> R.drawable.iscool_04
        5 -> R.drawable.iscool_05
        6 -> R.drawable.iscool_06
        7 -> R.drawable.iscool_07
        8 -> R.drawable.iscool_08
        9 -> R.drawable.iscool_09
        10 -> R.drawable.iscool_10
        11 -> R.drawable.iscool_11
        12 -> R.drawable.iscool_12
        13 -> R.drawable.iscool_13
        14 -> R.drawable.notcool_01
        15 -> R.drawable.notcool_02
        16 -> R.drawable.notcool_03
        17 -> R.drawable.notcool_04
        18 -> R.drawable.notcool_05
        19 -> R.drawable.notcool_06
        20 -> R.drawable.notcool_07
        else -> R.drawable.notcool_10
    }
    // State for handling button click status
    var buttonClicked by remember { mutableStateOf(false) }
    // Remembering the latest value of the result
    val updatedResult = rememberUpdatedState(result)

    // Function to generate random numbers so that same number never comes twice in a row
    // (i.e. same image is not shown twice in a row)
    fun generateRandomNumber(range: IntRange, previousNumber: Int?): Int {
        var newNumber: Int
        do {
            newNumber = range.random()
        } while (newNumber == previousNumber)
        return newNumber
    }

    // Loop to show images in gradually reducing interval
    val handler = Handler(Looper.getMainLooper())
    DisposableEffect(Unit) {
        val runnable = object : Runnable {
            var delayMillis = 3000L // Initial interval is 3 seconds
            var previousNum: Int? = null

            override fun run() {
                if ((!buttonClicked && updatedResult.value < 14) || (buttonClicked && updatedResult.value > 13)) {
                    navController.navigate("EndGameRoute/$points")
                } else {
                    buttonClicked = false
                }
                result = generateRandomNumber(1..20, previousNum)
                previousNum = result

                // Reduce the interval gradually by 100 milliseconds
                delayMillis -= 100
                // Limit to a minimum interval of 400 milliseconds
                delayMillis = delayMillis.coerceAtLeast(400)

                handler.postDelayed(this, delayMillis)
                points += 1
            }
        }
        handler.postDelayed(runnable, 3000) // Start with an initial interval of 3 seconds
        onDispose {
            handler.removeCallbacksAndMessages(null)
        }
    }

    Column (
        modifier = modifier
            .padding(bottom = 24.dp)
            .fillMaxWidth(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Displaying the current points
        Text("Points: $points", fontSize = 24.sp)
        // Displaying the image
        Image(
            painter = painterResource(imageResource),
            contentDescription = "1",
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(bottom = 8.dp)
        )
        // Button for player interaction
        Button(
            onClick = { buttonClicked = true },
            modifier = Modifier
                .clip(CircleShape)
                .size(150.dp)
        ) {
            Text(stringResource(R.string.cool))
        }
    }
}
