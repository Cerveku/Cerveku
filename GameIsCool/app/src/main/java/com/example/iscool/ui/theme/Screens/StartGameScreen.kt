package com.example.iscool.ui.theme.Screens

import android.widget.TextView
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.iscool.R
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.Alignment
import androidx.compose.ui.res.painterResource

@Composable
fun StartGameScreen(
    navController: NavHostController,
    modifier: Modifier = Modifier
){
    Column(
        modifier = Modifier
            .fillMaxSize() // Fills the entire screen
            .padding(top = 50.dp) // Adds padding at the top
            .padding(24.dp), // Adds padding around the edges
        verticalArrangement = Arrangement.Top, // Aligns content to the top
        horizontalAlignment = Alignment.CenterHorizontally // Centers content horizontally
    ) {
        val image = painterResource(R.drawable.logo)
        Image(
            painter = image,
            contentDescription = null,
            modifier = Modifier.padding(top = 40.dp) // Adds padding above the image
        )
        Text(
            text = stringResource(R.string.instructionsText),
            modifier = Modifier
                .padding(top = 100.dp) // Adds padding above the text
        )
        Spacer(modifier = Modifier.weight(2f)) // Takes up 2/3 of the remaining space before the button
        Button(
            onClick = { navController.navigate("PlayGameRoute") }, // Navigates to the game screen
            modifier = Modifier
                .size(100.dp) // Sets the size of the button
        ) {
            Text(stringResource(R.string.playButtonText)) // Button text
        }
        Spacer(modifier = Modifier.weight(1f)) // Takes up 1/3 of the remaining space after the button
    }
}
